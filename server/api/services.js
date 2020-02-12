const router = require('express').Router()
const {Service, User, ServiceCategory, Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const services = await Service.findAll()
    const seenServices = new Set()
    services.forEach(service => {
      if (!seenServices.has(service.name)) seenServices.add(service.name)
    })
    res.json(
      Array.from(seenServices).sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase())
      })
    )
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
        },
        {
          model: Review,
          attributes: ['rating', 'comment']
        }
      ]
    })

    res.json(service)
  } catch (err) {
    console.error(err)
  }
})
