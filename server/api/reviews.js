const router = require('express').Router()
const {Service, User, Review, Swap} = require('../db/models')
const {Op} = require('sequelize')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {serviceId, rating, comment} = req.body
    const newReview = await Review.create({
      serviceId: serviceId,
      rating: rating,
      comment: comment
    })

    res.json(newReview)
  } catch (err) {
    next(err)
  }
})

//get unreviewed swapId, date, and serviceId by user
router.get('/unreviewedSwaps/:userId', async (req, res, next) => {
  try {
    const id = Number(req.params.userId)
    const now = new Date().toISOString()
    let unreviewedServices = []

    //get all swaps by user before now
    const userSwapsBeforeToday = await Swap.findAll({
      where: {
        swapDate: {[Op.lt]: now},
        [Op.or]: [{requesterId: id}, {responderId: id}]
      }
    })

    // if any result, then put the serviceIds, dates, and swapId's that don't belong to that user into an array when the serviceReviewed status is false
    if (userSwapsBeforeToday.length) {
      for (let i = 0; i < userSwapsBeforeToday.length; i++) {
        if (
          userSwapsBeforeToday[i].requesterId !== id &&
          !userSwapsBeforeToday[i].requesterServiceReviewed
        ) {
          unreviewedServices.push(
            userSwapsBeforeToday[i].requesterServiceId,
            userSwapsBeforeToday[i].id,
            userSwapsBeforeToday[i].swapDate
          )
        }
        if (
          userSwapsBeforeToday[i].responderId !== id &&
          !userSwapsBeforeToday[i].responderServiceReviewed
        ) {
          unreviewedServices.push(
            userSwapsBeforeToday[i].responderServiceId,
            userSwapsBeforeToday[i].id,
            userSwapsBeforeToday[i].swapDate
          )
        }
      }
    }
    //return the queue of unreviewed services in the form: [serviceId, swapDate, swapId]
    res.json(unreviewedServices)
  } catch (err) {
    next(err)
  }
})

//get unreviewed service with servicer name and user Id
router.get('/unreviewedServices/:ServiceId', async (req, res, next) => {
  try {
    const unreviewedService = await Service.findOne({
      attributes: ['id', 'name'],
      where: {
        id: +req.params.ServiceId
      },
      include: [{model: User, attributes: ['firstName', 'lastName']}]
    })

    res.json(unreviewedService)
  } catch (err) {
    next(err)
  }
})
