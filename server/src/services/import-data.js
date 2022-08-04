const axios = require('axios')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const options = {
  method: 'GET',
  url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/',
  headers: {
    'X-RapidAPI-Key': '4e24607c86msh6dd90dfba47c654p1dda45jsn27492892dc2f',
    'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
  }
};

function getAllCountriesData() {
  return axios.request(options).then(function (response) {
    let result = []
    response.data.forEach(doc => {
      result.push({
        id: doc.id,
        rank: doc.rank,
        country: doc.Country,
        continent: doc.Continent,
        twoLetterSymbol: doc.TwoLetterSymbol,
        threeLetterSymbol: doc.ThreeLetterSymbol,
        infectionRisk: doc.Infection_Risk,
        caseFatalityRate: doc.Case_Fatality_Rate,
        recoveryProporation: doc.Recovery_Proporation,
        totalCases: doc.TotalCases,
        newCases: doc.NewCases,
        totalDeaths: doc.TotalDeaths,
        newDeaths: doc.NewDeaths,
        totalRecovered: doc.TotalRecovered,
        newRecovered: doc.NewRecovered,
        activeCases: doc.ActiveCases,
        population: doc.Population,
        totalTests: doc.TotalTests
      })
    })
    return result
  }).catch(function (error) {
    console.error(error);
  });
}

function getWorldData() {
  let option = options
  option.url += 'world'
  return axios.request(option).then(function (response) {
    let result = []
    response.data.forEach(doc => {
      result.push({
        id: doc.id,
        rank: doc.rank,
        country: doc.Country,
        continent: doc.Continent,
        twoLetterSymbol: doc.TwoLetterSymbol,
        threeLetterSymbol: doc.ThreeLetterSymbol,
        infectionRisk: doc.Infection_Risk,
        caseFatalityRate: doc.Case_Fatality_Rate,
        recoveryProporation: doc.Recovery_Proporation,
        totalCases: doc.TotalCases,
        newCases: doc.NewCases,
        totalDeaths: doc.TotalDeaths,
        newDeaths: doc.NewDeaths,
        totalRecovered: doc.TotalRecovered,
        newRecovered: doc.NewRecovered,
        activeCases: doc.ActiveCases,
        population: doc.Population,
        totalTests: doc.TotalTests
      })
    })
    return result[0]
  }).catch(function (error) {
    console.error(error);
  });
}

//TODO
function getStatesDataOfACountry(iso) {
  let option = {
    method: 'GET',
    url: `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/api-covid-data/reports/${iso}`,
    headers: {
      'X-RapidAPI-Key': '4e24607c86msh6dd90dfba47c654p1dda45jsn27492892dc2f',
      'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
    }
  };

  return axios.request(option).then(function (response) {
    return response.data
  }).catch(function (error) {
    console.error(error);
  });
}

async function pushDataToDB() {
  let countriesData = await getAllCountriesData()
  let worldData = await getWorldData()
  try {
    await prisma.Country.createMany({ data: countriesData })
    await prisma.Country.create({ data: worldData[0] })
    console.log('Insert data successfully!')

  } catch (error) {
    console.log(error)
  }
}

async function updateData() {
  let allCountriesData = await getAllCountriesData()
  let worldData = await getWorldData()
  allCountriesData.forEach(async data => {
    await prisma.Country.update({
      where: {
        id: data.id,
      },
      data
    })
  })
  await prisma.Country.update({
    where: {
      country: "World",
    },
    data: worldData
  })
}


module.exports = {
  getAllCountriesData,
  getWorldData,
  getStatesDataOfACountry,
  pushDataToDB,
  updateData
}
