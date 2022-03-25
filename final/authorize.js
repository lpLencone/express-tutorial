function authorize(req, res, next) {
  // get user paramenter
  const { user } = req.query
  if (user === 'lucas') {
    req.user = { name: 'lucas', id: 3 }
    console.log('authorized')
    next()
  } else {
    res.send('unauthorized')
  }
}
module.exports = authorize
