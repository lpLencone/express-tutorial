const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(401)
      .send(
        '<h2>Please provide credentials</h2><a href="index.html">return to form</a>'
      )
  }
  res.status(200).send(`<h1>Welcome, ${name}</h1>`)
})

module.exports = router
