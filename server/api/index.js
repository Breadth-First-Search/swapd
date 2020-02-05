const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/interests', require('./interests'))
router.use('/services', require('./services'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
