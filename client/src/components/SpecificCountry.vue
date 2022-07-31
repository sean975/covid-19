<template>
  <a-descriptions :title="data.country + ' Statistics'" bordered>
    <a-descriptions-item label="Country">{{
      data.country
    }}</a-descriptions-item>
    <a-descriptions-item label="Rank">{{ data.rank }}</a-descriptions-item>
    <a-descriptions-item label="Continent">{{
      data.continent
    }}</a-descriptions-item>
    <a-descriptions-item label="Infection Risk">{{
      data.infectionRisk
    }}</a-descriptions-item>
    <a-descriptions-item label="Case Fatality Rate">{{
      data.caseFatalityRate
    }}</a-descriptions-item>
    <a-descriptions-item label="Recovery Proporation">{{
      data.recoveryProporation
    }}</a-descriptions-item>
    <a-descriptions-item label="Total Cases">{{
      data.totalCases
    }}</a-descriptions-item>
    <a-descriptions-item label="New Cases">{{
      data.newCases
    }}</a-descriptions-item>
    <a-descriptions-item label="Total Death">{{
      data.totalDeaths
    }}</a-descriptions-item>
    <a-descriptions-item label="New Deaths">{{
      data.newDeaths
    }}</a-descriptions-item>
    <a-descriptions-item label="Total Recovered">{{
      data.totalRecovered
    }}</a-descriptions-item>
    <a-descriptions-item label="New Recovered">{{
      data.newRecovered
    }}</a-descriptions-item>
    <a-descriptions-item label="Active Cases">{{
      data.activeCases
    }}</a-descriptions-item>
    <a-descriptions-item label="Total Tests">{{
      data.totalTests
    }}</a-descriptions-item>
    <a-descriptions-item label="Population">{{
      data.population
    }}</a-descriptions-item>
  </a-descriptions>
</template>

<script>
import { Descriptions, DescriptionsItem } from 'ant-design-vue';

export default {
  name: 'SpecificCountry',
  components: {
    ADescriptionsItem: DescriptionsItem,
    ADescriptions: Descriptions,
  },
  props: {
    data: Object,
  },
};
</script>

<style>
.ant-descriptions-title {
  text-align: center;
  margin-top: 10px;
}
</style>
