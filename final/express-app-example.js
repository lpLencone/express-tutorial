const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.status(200)
  res.send('hello world')
})

// ALL handles all http verbs; '*' handles every possible path
app.all('*', (req, res) => {
  res.status(404)
  res.send('<h1>Resource not found</h1>')
})

// set port the server will be listening on
const port = 5000
app.listen(port, () => {
  console.log(`Server running on port: ${port}....`)
})
