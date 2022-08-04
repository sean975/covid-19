
const express = require('express')
require('dotenv').config()
const cors = require('cors')

const { updateData } = require('./services/import-data')

const app = express()
const port = process.env.PORT || 8888
const countriesRouter = require('./routes/countries.router.js')
const statesRouter = require('./routes/states.router')

//* middleware
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.send('hello world')
})
app.use('/countries', countriesRouter)
app.use('/states', statesRouter)

setInterval(updateData, 24 * 3600 * 1000)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
