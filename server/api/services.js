const router = require('express').Router()
const {Service, User, ServiceCategory} = require('../db/models')
module.exports = router

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
        'serviceRating'
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
