const router = require('express').Router()
const {User, Interest, UserInterest, Service} = require('../db/models')
module.exports = router

// route we can use to get all users and their interests
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      include: [{model: Interest, as: 'interests', through: UserInterest}]
    })
    console.log(users)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get all users who have a specified service, eager loading their interests...this may not work
// to be used in search page
router.get('/services/:serviceName', async (req, res, next) => {
  try {
    console.log(req.params.serviceName)
    const users = await User.findAll({
      include: [
        {
          model: Service,
          where: {
            name: req.params.serviceName
          }
        },
        {
          model: Interest,
          as: 'interests',
          through: UserInterest
        }
      ]
    })

    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get all a user's interests
// router.get('/:userId/interests', async (req, res, next) => {
//   try {
//     const interests = await User.findOne({
//       attributes: ['id', 'firstName', 'lastName'],
//       where: {
//         userId: req.params.userId,
//         include: [
//           {model: Interest, as: 'interests', through: UserInterest}
//         ]
//       }
//     })
//     res.json(interests)
//   } catch (err) {
//     next(err)
//   }
// });
