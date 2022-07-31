const express = require('express')
const router = express.Router()
const { PrismaClient } = require("@prisma/client")
const { State } = new PrismaClient()
const { getStatesDataOfACountry } = require('../services/import-data')
const toJson = require('../helpers/serialize-bigint')

router.get('/', (req, res) => {
  res.send('hi')
})

//* get stats for all states of a specific country
router.get('/:iso', async (req, res) => {
  const iso = req.params.iso.toUpperCase()
  const isAvailable = await State.findFirst({
    where: {
      iso: iso
    }
  })
  if (isAvailable === null) {
    const statesData = await getStatesDataOfACountry(iso)
    //* insert data into db
    statesData.forEach(async state => {
      if (state.province !== '') {
        const data = {
          country: state.name,
          province: state.province,
          iso: state.iso,
          date: state.date,
          confirmed: state.confirmed,
          recovered: state.recovered,
          deaths: state.recovered,
          caseFatalityRate: state.Case_Fatality_Rate,
          fatalityRate: state.Fatality_Rate,
          active: state.active,
          recoveryProporation: state.Recovery_Proporation,
        }
        await State.create({ data })
      }
    })
  }

  const statesFetchedData = await State.findMany({
    where: {
      iso: iso
    }
  })
  res.status(200).json(toJson(statesFetchedData))
})

module.exports = router
