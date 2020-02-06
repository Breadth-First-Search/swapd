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
