const express = require('express')
const app = express()
let { people } = require('./data')

app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    // 400 Bad Request:
    // The server cannot or will not process the request due to something that is perceived to be a client error.
    return res
      .status(400)
      .json({ success: false, msg: 'Please provide credentials.' })
  }
  // 201 Created: The request succeeded, and a new resource was created as a result.
  res.status(201).json({ sucess: true, person: name })
})

app.post('/api/postman/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'Please provide credentials.' })
  }
  res.status(201).json({ sucess: true, data: [...people, name] })
})

app.post('/login', (req, res) => {
  const { name } = req.body
  if (name) {
    return res.status(200).send(`Welcome, ${name}`)
  }
  res.status(401).send('Please provide credentials')
})

app.listen(5000, () => {
  console.log('server running on port: 5000')
})
