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
  userInterestsToSet,
  getScoreFromOverallRating,
  getScoreFromInterestsObject,
  getScoreFromSkillRating,

  prefs
} = require('../algorithm')
module.exports = router

// route to get all users and their interests
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'bio',
        'overallRating',
        'reviewCount'
      ],
      include: [{model: Interest, as: 'interests', through: UserInterest}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/top', async (req, res, next) => {
  try {
    //get all users where the overallRating is greater than 3
    const topUsers = await User.findAll({
      where: {
        overallRating: {
          [Sequelize.Op.gte]: 3.0
        },
        reviewCount: {
          [Sequelize.Op.gte]: 3
        }
      },
      attributes: ['id', 'firstName', 'lastName', 'photo', 'overallRating']
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

// get single user data
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'bio',
        'photo',
        'overallRating',
        'distancePrefWeight',
        'reviewCount'
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
            'videoUrl',
            'reviewCount',
            'description',
            'remote'
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

//change data in the user table if logged-in user
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.userId)
    if (req.user) {
      if (req.user.id === user.id) {
        const userEdit = await user.update(req.body)
        res.json(userEdit)
      }
    } else {
      res.sendStatus(403)
    }
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

//post services by userId and service categories if logged-in user
router.post('/:userId/services', async (req, res, next) => {
  try {
    const newService = req.body.service
    const description = req.body.description
    const proficiency = req.body.proficiency
    const remote = req.body.remote

    if (req.user) {
      if (req.user.id === +req.params.userId) {
        const service = await Service.create({
          name: newService,
          userId: req.params.userId,
          description,
          proficiency,
          remote
        })

        res.json(service)
      }
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    console.error(err)
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
router.post('/:userId/interests', async (req, res, next) => {
  try {
    const {name, userId} = req.body
    const interest = await Interest.findOne({where: {name: name}})
    if (req.user) {
      if (req.user.id === userId) {
        if (interest) {
          await UserInterest.create({
            userId: userId,
            interestId: interest.id
          })
          res.json(interest)
        } else {
          const newInterest = await Interest.create({name: name})
          await UserInterest.create({
            userId: userId,
            interestId: newInterest.id
          })
          res.json(newInterest)
        }
      }
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

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

    const serviceNames = await Service.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name']]

      // [Sequelize.fn('DISTINCT', Sequelize.col('country')) ,'country'],
    })

    let result = bestMatch(serviceNames, req.params.serviceName)

    let info = [result[0].dataValues.name, result[1].dataValues.name]

    console.log(result[0].dataValues.name, result[2])
    console.log(result[1].dataValues.name, result[3])

    const users = await User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'bio',
        'photo',
        'overallRating',
        'distancePrefWeight',
        'reviewCount'
      ],
      include: [
        {
          model: Service,
          where: {
            name: result[0].dataValues.name
          }
        },
        {
          model: Interest,
          as: 'interests',
          through: UserInterest
        }
      ]
    })

    users.sort((userA, userB) => {
      userA = userA.dataValues
      userB = userB.dataValues

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

    users.push(info)

    res.json(users)
  } catch (err) {
    next(err)
  }
})

// to be used in search page
function customLCS_subseq(s1, s2) {
  let dp = [] /* .fill(Array(s2.length+1).fill(0)) */

  for (let row = 0; row <= s1.length; row++) {
    dp.push([])
    for (let col = 0; col <= s2.length; col++) {
      dp[row].push([])
    }
  }

  // let lcs = []
  for (let row = 1; row < dp.length; row++) {
    for (let col = 1; col < dp[row].length; col++) {
      if (s1[row - 1].toLowerCase() === s2[col - 1].toLowerCase()) {
        const prev = dp[row - 1][col - 1]
        // if(prev.length > 0) {
        //   if(Math.abs(prev[prev.length - 1] - (col - 1)) > 2){
        //     dp[row][col] = [...prev]
        //     continue
        //   }
        // }
        dp[row][col] = [...prev, col - 1] // String: dp[row - 1][col - 1] + s1[row - 1].toLowerCase()
        // lcs = lcs.length < dp[row][col].length ? dp[row][col] : lcs
      } else {
        dp[row][col] =
          dp[row - 1][col].length > dp[row][col - 1].length
            ? [...dp[row - 1][col]]
            : [...dp[row][col - 1]] //String:  dp[row - 1][col].length > dp[row][col - 1].length ? dp[row - 1][col] : dp[row][col - 1]
      }
    }
  }
  // console.log(dp[s1.length][s2.length])
  return dp[s1.length][s2.length].length
}

function customLCS_substr(s1, s2) {
  let dp = []

  for (let row = 0; row <= s1.length; row++) {
    dp.push([])
    for (let col = 0; col <= s2.length; col++) {
      dp[row].push(0)
    }
  }

  let max = 0

  for (let row = 1; row < dp.length; row++) {
    for (let col = 1; col < dp[row].length; col++) {
      if (s1[row - 1].toLowerCase() === s2[col - 1].toLowerCase()) {
        dp[row][col] = dp[row - 1][col - 1] + 1
        max = Math.max(max, dp[row][col])
      }
    }
  }

  return max
}

function KMPmatch(s, p) {
  const failure = pattern => {
    const ret = Array(pattern.length).fill(0)

    let k = 0,
      j = 1

    while (j < pattern.length) {
      if (pattern[j] === pattern[k]) {
        ret[j] = k + 1
        k++
        j++
      } else if (k > 0) {
        k = ret[k - 1]
      } else j++
    }
    return ret
  }

  if (p.length === 0) return 0
  let j = 0,
    k = 0
  const fail = failure(p)
  // console.log(fail)
  while (j < s.length) {
    if (s[j] === p[k]) {
      if (k === p.length - 1) return j - p.length + 1
      j++
      k++
    } else if (k > 0) k = fail[k - 1]
    else j++
  }

  return -1
}

function bestMatch(serviceNames, searchString) {
  let max = 0
  let max2 = 0
  let top = serviceNames[0]
  let top2 = serviceNames[1]

  serviceNames.forEach(serviceObj => {
    const res = customLCS_substr(searchString, serviceObj.name)
    if (res > max) {
      max2 = max
      top2 = top

      max = res
      top = serviceObj
    } else if (res > max2) {
      max2 = res
      top2 = serviceObj
    }
  })
  return [top, top2, max, max2]
}
