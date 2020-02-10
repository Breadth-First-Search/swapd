const router = require('express').Router()
const {Swap, Message, User} = require('../db/models')
const {Op} = require('sequelize')

module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const swaps = await Swap.findAll({
      where: {
        [Op.or]: [
          {requesterId: req.params.userId},
          {responderId: req.params.userId}
        ]
      },
      include: [
        {
          model: Message,
          include: [
            {model: User, as: 'responder'},
            {model: User, as: 'requester'}
          ]
        }
      ],
      order: [[{model: Message}, 'id', 'ASC']]
    })
    res.json(swaps)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  console.log(req.body)
  try {
    const swaps = await Swap.findOrCreate({
      where: req.body
    })
    console.log(swaps)
    res.json(swaps)
  } catch (error) {
    next(error)
  }
})

//updtate review status
router.put('/reviews/:swapId', async (req, res, next) => {
  try {
    const swapId = Number(req.params.swapId)
    const {userId} = req.body
    Number(userId)
    const swap = await Swap.findByPk(swapId)
    console.log('swap in update review api', swap)
    if (swap.requesterId !== userId) {
      const updated = await swap.update({requesterServiceReviewed: true})
      res.json(updated)
    } else {
      const updated = await swap.update({responderServiceReviewed: true})
      res.json(updated)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:swapId/services/:serviceId', async (req, res, next) => {
  try {
    const swapToUpdate = await Swap.findByPk(+req.params.swapId)

    await swapToUpdate.update({
      requesterServiceId: +req.params.serviceId,
      swapStatus: 'Active'
    })

    res.json(swapToUpdate)
  } catch (err) {
    next(err)
  }
})
