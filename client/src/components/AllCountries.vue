<template>
  <a-descriptions title="All Countries Statistics" bordered></a-descriptions>
  <a-table :columns="columns" :data-source="arrayData" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'country'">
        <a>{{ text }}</a>
      </template>
    </template>
  </a-table>
</template>

<script>
import { Descriptions, Table } from 'ant-design-vue';
export default {
  name: 'AllCountries',
  components: {
    ADescriptions: Descriptions,
    ATable: Table,
  },
  data() {
    return {
      columns: [
        {
          title: 'Rank',
          dataIndex: 'rank',
        },
        {
          title: 'Country',
          dataIndex: 'country',
        },
        {
          title: 'Continent',
          dataIndex: 'continent',
        },
        {
          title: 'Infection Risk',
          dataIndex: 'infectionRisk',
        },
        {
          title: 'Case Fatality Rate',
          dataIndex: 'caseFatalityRate',
        },
        {
          title: 'Recovery Proporation',
          dataIndex: 'recoveryProporation',
        },
        {
          title: 'Total Cases',
          dataIndex: 'totalCases',
        },
        {
          title: 'New Cases',
          dataIndex: 'newCases',
        },
        {
          title: 'Total Deaths',
          dataIndex: 'totalDeaths',
        },
        {
          title: 'New Deaths',
          dataIndex: 'newDeaths',
        },
        {
          title: 'Total Recovered',
          dataIndex: 'totalRecovered',
        },
        {
          title: 'New Recovered',
          dataIndex: 'newRecovered',
        },
        {
          title: 'Active Cases',
          dataIndex: 'activeCases',
        },
        {
          title: 'Population',
          dataIndex: 'population',
        },
        {
          title: 'Total Tests',
          dataIndex: 'totalTests',
        },
      ],
    };
  },
  props: {
    arrayData: Array,
  },
};
</script>
