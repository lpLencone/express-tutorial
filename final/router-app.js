const express = require('express')
const app = express()

// get routers
const peopleRouter = require('./routes/router-people')
const loginRouter = require('./routes/router-auth')

app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

// use peopleRouter for /api/people
app.use('/api/people', peopleRouter)

// use loginRouter for /login
app.use('/login', loginRouter)

app.listen(5000, () => {
  console.log('server running on port: 5000')
})
