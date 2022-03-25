const express = require('express')
const app = express()

function logger(req, res, next) {
  const method = req.method
  const url = req.url
  const year = new Date().getFullYear()
  console.log(method, url, year)
  next()
}

app.get('/', logger, (req, res) => {
  res.send('hello')
})

app.get('/about', logger, (req, res) => {
  res.send('get about')
})

app.listen(5000, () => {
  console.log('server running on port: 5000')
})
