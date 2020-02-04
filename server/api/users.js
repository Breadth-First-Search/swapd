const router = require('express').Router()
const {User, Interest, UserInterest, Service} = require('../db/models')
const {
  interestsList,
  userInterestsToSet,
  getScoreFromInterests,
  getScoreFromOverallRating,
  getScoreFromInterestsObject,
  getScoreFromSkillRating,
  getScoreFromLocationm,
  prefs
} = require('../algorithm')
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

router.get('/:userId', async (req, res, next) => {
  try {
    const id = Number(req.params.userId)

    const userWithServices = await User.findOne({
      where: {id: id},
      include: [{model: Service}]
    })
    res.json(userWithServices)
  } catch (err) {
    next(err)
  }
})

// get all users who have a specified service, eager loading their interests
// to be used in search page
router.get('/services/:serviceName/', async (req, res, next) => {
  try {
    // get all interest ids of the searching user
    let searcherInterests = await UserInterest.findAll({
      attributes: ['interestId'],
      where: {
        userId: Number(req.query.searcherId)
      }
    })

    let searcherInterestsSet = userInterestsToSet(searcherInterests)

    // get all users who have services that match the search and include their interest ids
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

    // algorithm here
    // console.log(users);

    users.sort((userA, userB) => {
      userA = userA.dataValues
      userB = userB.dataValues
      // console.log(userA.interests)
      // console.log(userB.interests)
      let numIntersectionsA = getScoreFromInterestsObject(
        searcherInterestsSet,
        userA.interests
      )
      let numIntersectionsB = getScoreFromInterestsObject(
        searcherInterestsSet,
        userB.interests
      )

      let userAScore =
        prefs.overallRating * getScoreFromOverallRating(userA.overallRating) +
        prefs.skillRating *
          getScoreFromSkillRating(userA.services[0].serviceRating) +
        numIntersectionsA * prefs.interests

      let userBScore =
        prefs.overallRating * getScoreFromOverallRating(userB.overallRating) +
        prefs.skillRating *
          getScoreFromSkillRating(userB.services[0].serviceRating) +
        numIntersectionsB * prefs.interests

      // console.log(`${userA.firstName} ${userAScore}`)
      // console.log(`${userB.firstName} ${userBScore}`)

      return userBScore - userAScore
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
