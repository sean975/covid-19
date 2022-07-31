const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const { Country } = new PrismaClient()

const toJson = require('../helpers/serialize-bigint')

//* get all countries data
router.get('/', async (req, res) => {
  const allCountriesData = await Country.findMany({
    where: {
      NOT: { threeLetterSymbol: null }
    }
  })
  res.status(200).send(toJson(allCountriesData))
})

//* get world data
router.get('/world', async (req, res) => {
  const worldData = await Country.findFirst({
    where: {
      country: "World"
    }
  })

  return res.status(200).send(toJson(worldData))
})

//* get one country data
router.get('/:iso', async (req, res) => {
  const countryData = await Country.findFirst({
    where: {
      threeLetterSymbol: req.params.iso
    }
  })
  console.log(countryData)
  if (countryData) return res.status(200).send(toJson(countryData))
  return res.status(404).json({ msg: "Country not found" })
})


module.exports = router
