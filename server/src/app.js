
const express = require('express')
require('dotenv').config()
const cors = require('cors')

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
