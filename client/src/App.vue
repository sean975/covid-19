<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    :title="title"
    sub-title=""
    @back="() => null"
  />
  <div class="main">
    <div class="button-container">
      <a-button
        :type="currentButton == 'allCountries' ? 'primary' : ''"
        @click.prevent="loadCountriesData"
        >All Countries</a-button
      >
      <a-button
        :type="currentButton == 'world' ? 'primary' : ''"
        @click.prevent="loadWorldData"
        >World</a-button
      >
      <a-button
        :type="currentButton == 'vietnam' ? 'primary' : ''"
        @click.prevent="loadVietnamData"
        >Vietnam</a-button
      >
    </div>

    <!-- Input field -->
    <a-input-search
      v-model:value="country"
      placeholder="search country here"
      enter-button="Search"
      size="large"
      class="search"
      @search="loadCountryData"
    />
    <a-alert
      v-if="!isValidCountry"
      message="Error"
      description="Please enter a valid country."
      type="error"
      show-icon
    />

    <!-- Table for all countries data -->
    <all-countries
      v-if="currentButton == 'allCountries'"
      :arrayData="arrayData"
      @paginate-countries-data="paginateCountriesData"
    ></all-countries>

    <!-- Table for a specific country data -->
    <specific-country v-else :data="data"></specific-country>

    <a-button class="export-btn" @click.prevent="exportPDF"
      >Export PDF</a-button
    >
  </div>
</template>

<script>
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4e24607c86msh6dd90dfba47c654p1dda45jsn27492892dc2f',
    'X-RapidAPI-Host':
      'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
  },
};
const BASE_URL = 'http://localhost:8000';

import { PageHeader, Button, InputSearch, Alert } from 'ant-design-vue';
import SpecificCountry from '@/components/SpecificCountry.vue';
import AllCountries from '@/components/AllCountries.vue';
import { upperFirst, lowerCase } from 'lodash';

import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  name: 'App',
  components: {
    AButton: Button,
    APageHeader: PageHeader,
    AInputSearch: InputSearch,
    AAlert: Alert,
    SpecificCountry,
    AllCountries,
  },
  data() {
    return {
      title: 'VACCOVID - coronavirus, vaccine and treatment tracker',
      data: {},
      arrayData: [],

      country: '',
      listCountry: [],
      currentButton: 'world',
      isValidCountry: true,
    };
  },
  computed: {
    formattedCountry() {
      return upperFirst(lowerCase(this.country.split(' ').join('')));
    },
  },
  methods: {
    loadWorldData() {
      this.isValidCountry = true;
      this.currentButton = 'world';
      axios
        .get(`${BASE_URL}/countries/world`)
        .then((response) => {
          this.data = response.data;
        })
        .catch((err) => console.error(err));
    },
    loadCountryData() {
      //check if country is valid
      const found = this.listCountry.find(
        (country) => country.Country === this.formattedCountry
      );
      if (!found) {
        console.error('invalid country');
        this.isValidCountry = false;
        return;
      }
      this.isValidCountry = true;
      this.currentButton = found.country;
      const isoCode = found.ThreeLetterSymbol;

      // fetch data
      axios
        .get(`${BASE_URL}/countries/${isoCode}`)
        .then((response) => {
          this.data = response.data;
        })
        .catch((err) => console.error(err));
    },
    loadVietnamData() {
      this.isValidCountry = true;
      this.currentButton = 'vietnam';
      axios
        .get(`${BASE_URL}/countries/vnm`)
        .then((response) => {
          this.data = response.data;
        })
        .catch((err) => console.error(err));
    },
    loadCountriesData() {
      this.currentButton = 'allCountries';
      this.isValidCountry = true;
      axios
        .get(`${BASE_URL}/countries`)
        .then((response) => {
          this.arrayData = response.data;
          console.log(this.arrayData);
        })
        .catch((error) => console.log(error));
    },
    paginateCountriesData(newData) {
      this.arrayData = newData;
    },

    loadCountries() {
      fetch(
        'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered',
        options
      )
        .then((response) => response.json())
        .then((response) => (this.listCountry = response))
        .catch((err) => console.error(err));
    },
    exportPDF() {
      window.html2canvas = html2canvas;
      const doc = new jsPDF();
      doc.html(document.querySelector('#app'), {
        callback: function (pdf) {
          pdf.save('statistic.pdf');
        },
      });
    },
  },
  beforeMount() {
    this.loadWorldData();
    this.loadCountries();
  },
};
</script>
<style>
.main {
  width: 90%;
  margin: 0 auto;
}
.button-container {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}

/* .ant-input-group-wrapper {
  max-width: 666px;
} */

.export-btn {
  margin-top: 10px;
  float: right;
}
</style>
