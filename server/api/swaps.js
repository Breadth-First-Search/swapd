const router = require('express').Router()
const {Swap, Message, User} = require('../db/models')
const {Op} = require('sequelize')

module.exports = router

// get messages by swap when logged-in user is either requester or responder
router.get('/:userId', async (req, res, next) => {
  try {
    const swaps = await Swap.findAll({
      where: {
        [Op.or]: [{requesterId: req.user.id}, {responderId: req.user.id}]
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

//create new swap if user is logged-in
router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      if (req.user.id === req.body.requesterId) {
        const swaps = await Swap.findOrCreate({
          where: req.body
        })
        res.json(swaps)
      }
    } else {
      res.sendStatus(403)
    }
  } catch (error) {
    next(error)
  }
})

//updtate review status if user is logged-in
router.put('/reviews/:swapId', async (req, res, next) => {
  try {
    const swapId = Number(req.params.swapId)
    const swap = await Swap.findByPk(swapId)

    if (swap.responderId === req.user.id) {
      const updated = await swap.update({requesterServiceReviewed: true})
      res.json(updated)
    } else if (swap.requesterId === req.user.id) {
      const updated = await swap.update({responderServiceReviewed: true})
      res.json(updated)
    }
  } catch (error) {
    next(error)
  }
})

//update swap status for logged-in user
router.put('/:swapId/services/:serviceId', async (req, res, next) => {
  try {
    const swapToUpdate = await Swap.findByPk(+req.params.swapId)
    if (
      swapToUpdate.responderId === req.user.id ||
      swapToUpdate.requesterId === req.user.id
    ) {
      await swapToUpdate.update({
        requesterServiceId: +req.params.serviceId,
        swapStatus: 'Active'
      })

      res.json(swapToUpdate)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})
