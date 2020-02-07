const router = require('express').Router()
const Sequelize = require('sequelize')
const {
  User,
  Interest,
  UserInterest,
  Service,
  ServiceCategory
} = require('../db/models')
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

router.get('/top', async (req, res, next) => {
  try {
    //get all users where the overallRating is greater than 4
    const topUsers = await User.findAll({
      where: {
        overallRating: {
          [Sequelize.Op.gte]: 4
        }
      }
    })
    const preference = {ratingWeight: 5, reviewCountWeight: 7}
    topUsers.sort((userA, userB) => {
      const userAScore =
        userA.overallRating * preference.ratingWeight +
        userA.reviewCount * preference.reviewCountWeight
      const userBScore =
        userB.overallRating * preference.ratingWeight +
        userB.reviewCount * preference.reviewCountWeight
      return userBScore - userAScore
    })
    const topTen = []
    for (let i = 0; i < 10; i++) {
      topTen.push(topUsers[i])
    }

    res.json(topTen)
  } catch (err) {
    next(err)
  }
})

//change data in the user table
router.put('/:userId', async (req, res, next) => {
  try {
    console.log('userPut', req.body)

    const user = await User.findByPk(+req.params.userId)

    const userEdit = await user.update(req.body)
    res.json(userEdit)
  } catch (err) {
    next(err)
  }
})

//get services by userId and service categories
router.get('/:userId/services', async (req, res, next) => {
  try {
    const userServices = await Service.findAll({
      where: {userId: req.params.userId},
      include: [{model: ServiceCategory}]
    })

    res.json(userServices)
  } catch (err) {
    console.error(err)
  }
})

//post services by userId and service categories
router.post('/:userId/services', async (req, res, next) => {
  try {
    const categoryName = req.body.serviceCategories
    const newService = req.body.service
    const description = req.body.description

    const serviceCategory = await ServiceCategory.findOne({
      where: {name: categoryName}
    })

    const service = await Service.create({
      name: newService,
      serviceCategoryId: serviceCategory.id,
      userId: req.params.userId,
      description: description
    })

    res.json(service)
  } catch (err) {
    console.error(err)
  }
})

// get single user data
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'phoneNumber',
        'bio',
        'photo',
        'email',
        'overallRating',
        'latitude',
        'longitude'
      ],
      include: [
        {
          model: Interest,
          attributes: ['name', 'id']
        },
        {
          model: Service,
          attributes: [
            'id',
            'name',
            'proficiency',
            'serviceRating',
            'imageUrl',
            'videoUrl'
          ],
          include: [
            {
              model: ServiceCategory,
              attributes: ['name']
            }
          ]
        }
      ]
    })

    res.json(user)
  } catch (err) {
    console.error(err)
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

// get all of one user's interests
router.get('/:userId/interests', async (req, res, next) => {
  try {
    const interests = await Interest.findAll({
      attributes: ['name', 'id'],
      include: [
        {
          attributes: ['id'],
          model: User,
          as: 'users',
          through: UserInterest,
          where: {
            id: req.params.userId
          }
        }
      ]
    })

    res.json(interests)
  } catch (err) {
    next(err)
  }
})

//add interest for a user ..add interest id to userInterest for user id.
router.post('/userInterests', async (req, res, next) => {
  try {
    let userInterest
    const {name, userId} = req.body
    const interest = await Interest.findOne({where: {name: name}})

    if (interest) {
      userInterest = await UserInterest.create({
        userId: userId,
        interestId: interest.id
      })
      res.json(interest)
    } else {
      const newInterest = await Interest.create({name: name})
      userInterest = await UserInterest.create({
        userId: userId,
        interestId: newInterest.id
      })
      res.json(newInterest)
    }
  } catch (err) {
    next(err)
  }
})
