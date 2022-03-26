const express = require('express')
const router = express.Router()

// get controller functions where the logic for each route was written
const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson
} = require('../controllers/people')

// setting up paths and methods individually
router.get('/', getPeople)
router.post('/', createPerson)
router.post('/postman', createPersonPostman)
router.put('/:id', updatePerson)
router.delete('/:id', deletePerson)

/* 
  // setting up paths and methods like chains
  // seems messier to me, though there are fewer lines of code
  // i'd imagine that, when various methods call the same path, it'd come in handy
  router.route('/').get(getPeople).post(createPerson)
  router.route('/postman').post(createPersonPostman)
  router.route('/:id').put(updatePerson).delete(deletePerson)
  
  // i'd like to see something like that:
  router.route('/path')
    .get(getFunction)
    .post(postFunction)
    .put(putFunction)
    .delete(deleteFunction)
    .head(headFunction)
    ...etc
*/

module.exports = router
