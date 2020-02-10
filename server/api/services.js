const router = require('express').Router()
const {Service, User, ServiceCategory} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const services = await Service.findAll()
    res.json(services)
  } catch (err) {
    console.error(err)
  }
})

router.get('/:serviceId', async (req, res, next) => {
  try {
    let service = await Service.findByPk(req.params.serviceId, {
      attributes: [
        'name',
        'description',
        'proficiency',
        'remote',
        'imageUrl',
        'videoUrl',
        'serviceRating',
        'remote',
        'serviceCategoryId',
        'reviewCount'
      ],
      include: [
        {
          model: ServiceCategory,
          attributes: ['name']
        }
      ]
    })

    res.json(service)
  } catch (err) {
    console.error(err)
  }
})
