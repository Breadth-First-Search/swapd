const router = require('express').Router()
const {ServiceCategory} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let serviceCategories = await ServiceCategory.findAll()

    res.json(serviceCategories)
  } catch (err) {
    console.error(err)
  }
})
