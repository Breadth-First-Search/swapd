const router = require('express').Router()
const {Interest} = require('../db/models')
module.exports = router

// route to get all interests for users to select
router.get('/', async (req, res, next) => {
  try {
    const interests = await Interest.findAll()
    res.json(interests)
  } catch (err) {
    next(err)
  }
})

//route to add interests
router.post('/', async (req, res, next) => {
  try {
    const newInterest = await Interest.create(req.body)
    res.json(newInterest)
  } catch (err) {
    next(err)
  }
})
