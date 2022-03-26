const express = require('express')
const app = express()
let { people } = require('./data')

app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.delete('/api/people/:id', (req, res) => {
  const { id } = req.params

  const status = people.find(person => {
    // if person with given id exists, remove it from people array
    if (person.id === Number(id)) {
      // return to people array the ones whose id don't match
      people = people.filter(person => {
        return person.id !== Number(id)
      })
      // assign true to the constant status to indicate that person with given id exists
      return true
    }
  })

  // if status is undefined (falsy), return error message
  if (!status) {
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
