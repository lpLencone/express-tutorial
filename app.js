const { readFileSync } = require('fs')
const path = require('path')

// path.resolve(__dirname) => C:\...\current-directory
// path.resolve(__dirname, './directory/file') => C:\...\current-directory\directory\file
// path.resolve(__filename) => C:\...\this-file-name

const express = require('express')
const app = express()

// The root argument specifies the root directory from which to serve static assets.
// The function determines the file to serve by combining req.url with the provided root directory.
app.use(express.static('./navbar-app'))

// app.get('/', (req, res) => {
//   res.status(200)
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// })

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
