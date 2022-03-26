const express = require('express')
const router = express.Router()

let { people } = require('../data')

router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

router.post('/', (req, res) => {
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

router.post('/postman', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'Please provide credentials.' })
  }
  res.status(201).json({ sucess: true, data: [...people, name] })
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router
