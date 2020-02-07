const router = require('express').Router()
const {Service, User, ServiceCategory, Message, Swap} = require('../db/models')
module.exports = router

// currently gets all messages and filters on front end
// need to build a query that gets all messages for all swaps that a user is a part of

router.get('/swap/:swapId', async (req, res, next) => {
  try {
    let messages = await Message.findAll({
      where: {
        swapId: req.params.swapId
      },
      include: [
        {
          model: User,
          as: 'responder',
          attributes: ['id', 'firstName', 'lastName', 'email', 'photo']
        },
        {
          model: User,
          as: 'requester',
          attributes: ['id', 'firstName', 'lastName', 'email', 'photo']
        }
      ],
      order: [['id', 'ASC']]
    })
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let swap = await Swap.findByPk(req.body.swapId)

    let message = {
      ...req.body,
      responderId: swap.dataValues.responderId,
      requesterId: swap.dataValues.requesterId
    }

    let newMessage = await Message.create(message)

    let newMessagePacked = await Message.findByPk(newMessage.dataValues.id, {
      include: [
        {
          model: User,
          as: 'responder',
          attributes: ['id', 'firstName', 'lastName', 'email', 'photo']
        },
        {
          model: User,
          as: 'requester',
          attributes: ['id', 'firstName', 'lastName', 'email', 'photo']
        }
      ]
    })

    res.json(newMessagePacked)
  } catch (err) {
    next(err)
  }
})
