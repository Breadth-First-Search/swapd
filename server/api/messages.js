const router = require('express').Router()
const {Service, User, ServiceCategory, Message, Swap} = require('../db/models')
module.exports = router

// currently gets all messages and filters on front end
// need to build a query that gets all messages for all swaps that a user is a part of

router.get('/swap/:swapId', async (req, res, next) => {
  try {
    const swap = await Swap.findByPk(+req.params.swapId)

    if (swap.responderId === req.user.id || swap.requesterId === req.user.id) {
      let messages = await Message.findAll({
        where: {
          swapId: req.params.swapId
        },
        include: [
          {
            model: Swap,
            attributes: ['id'],
            include: [
              {
                model: Service,
                as: 'responderService',
                attributes: [
                  'id',
                  'name',
                  'serviceRating',
                  'reviewCount',
                  'description',
                  'imageUrl',
                  'reviewCount',
                  'proficiency'
                ]
              },
              {
                model: Service,
                as: 'requesterService',
                attributes: [
                  'id',
                  'name',
                  'serviceRating',
                  'reviewCount',
                  'description',
                  'imageUrl',
                  'reviewCount',
                  'proficiency'
                ]
              }
            ]
          },
          {
            model: User,
            as: 'responder',
            attributes: ['id', 'firstName', 'lastName', 'email', 'photo']
          },
          {
            model: User,
            as: 'requester',
            attributes: ['id', 'firstName', 'lastName', 'email', 'photo'],
            include: [{model: Service}]
          }
        ],
        order: [['id', 'ASC']]
      })
      res.json(messages)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:messageId', async (req, res, next) => {
  try {
    const offerToEdit = await Message.findByPk(+req.params.messageId)

    await offerToEdit.update({type: 'OLD_OFFER'})

    res.json(offerToEdit)
  } catch (err) {
    next(err)
  }
})

// router.post('/initiate', async (req, res, next) => {
//   try {
//     let message = await Message.create(req.body)
//     res.json(message)
//   } catch (error) {
//     console.error(error)
//   }
// })

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
          model: Swap,
          attributes: ['id'],
          include: [
            {
              model: Service,
              as: 'responderService',
              attributes: ['id', 'name', 'serviceRating', 'reviewCount']
            },
            {
              model: Service,
              as: 'requesterService',
              attributes: ['id', 'name', 'serviceRating', 'reviewCount']
            }
          ]
        },
        {
          model: User,
          as: 'responder',
          attributes: ['id', 'firstName', 'lastName', 'email', 'photo']
        },
        {
          model: User,
          as: 'requester',
          attributes: ['id', 'firstName', 'lastName', 'email', 'photo'],
          include: [{model: Service}]
        }
      ]
    })

    res.json(newMessagePacked)
  } catch (err) {
    next(err)
  }
})
