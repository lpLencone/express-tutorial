const express = require('express')
const app = express()
let { people } = require('./data')

app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  // iterate over each person and, if id provided match, update its name and return person
  // if no person with such id matchs, person is set to undefined
  const person = people.find(person => {
    if (person.id === Number(id)) {
      person.name = name
      console.log(person)
      return person
    }
  })

  // if person is undefined, return error
  if (!person) {
    return res
      .status(400)
      .json({ success: false, msg: `No person with id ${id}` })
  }

  // if everything's ok, respond with updated data
  res.status(200).json({ success: true, data: people })
})

app.listen(5000, () => {
  console.log('server running on port: 5000')
})
