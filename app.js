const express = require('express')
const app = express()

// functions to be used as middlewares
const logger = require('./logger')
const authorize = require('./final/authorize')

// use [middlewares] on all routes
app.use([logger, authorize])

// use logger on /api/ routes
// app.use('/api', logger)

app.get('/', logger, (req, res) => {
  res.send('<h1>home page</h1>')
})

app.get('/about', logger, (req, res) => {
  res.send('<h1>about page</h1> ')
})

app.listen(5000, () => {
  console.log('server running on port: 5000')
})
