const util = require('util')
const {interestsList} = require('../script/seedGenerator')

function generateRandomUsers(interests = interestsList) {
  const allUsers = []

  // generate up to 100 random users
  for (let j = 0; j < 50; j++) {
    let user = {
      userId: j,
      overallRating: 5 * Math.random(),
      skillRating: 5 * Math.random(),
      interests: [],
      location: []
    }

    // 1. push random interests into a set to prevent duplicates
    // 2. turn the set into an array (by pushing values or something)
    // 3. set key 'interests' in user to the resulting array

    let interestsSet = new Set()

    for (let i = 0; i < Math.floor(Math.random() * interests.length / 3); i++) {
      // userInterests.push(interests)
      interestsSet.add(interests[Math.floor(Math.random() * interests.length)])
    }
    interestsSet.forEach(interest => user.interests.push(interest))

    user.interests.sort()

    allUsers.push(user)
  }

  return allUsers
}

function getScoreFromInterests(myInter, theirInter) {
  // making the users interests into a set. then iterating over the other users interests to see how many match.
  let myInterSet = new Set(myInter)

  let intersection = 0

  theirInter.forEach(interest => {
    if (myInterSet.has(interest)) intersection++
  })

  // score = sqrt(0.5 + 2 * # of intersecting interests)

  intersection = 0.5 + Math.sqrt(3 * intersection)

  if (intersection === 0.5) return -1.25

  // the max score of interests will be five. to match the weight of skills
  // if (intersection > 5) return 5
  return intersection
}

function userInterestsToSet(interests) {
  const ret = new Set()

  interests.forEach(interest => {
    ret.add(interest.dataValues.interestId)
  })

  return ret
}

function getScoreFromInterestsObject(myInterSet, theirInter) {
  let intersection = 0

  theirInter.forEach(interestObj => {
    intersection += myInterSet.has(interestObj.id) ? 1 : 0
  })

  intersection = 0.5 + Math.sqrt(3 * intersection)

  if (intersection === 0.5) return -1.25

  return intersection
}

//rewards users for having a rating of four or above, does the opposite
//for users with a rating of two or below.
function getScoreFromSkillRating(skillRating) {
  if (skillRating <= 2) return -1 * skillRating
  if (skillRating >= 4) return skillRating * 1.5
  return skillRating
}

// rewards users for having a rating above 4 and penalizes them for having a rating below 2
function getScoreFromOverallRating(overallRating) {
  if (overallRating <= 2) return overallRating - 2.3
  if (overallRating >= 4) return overallRating * 1.5
  return overallRating
}

function getScoreFromLocation(myLoc, theirLoc) {
  // score = inversely proportional to their ;
  /*
		distance calculated using havsine's formula

		https://www.movable-type.co.uk/scripts/latlong.html

		deltaLat = lat2 - lat1;
		deltaLong = long2 - long1;

		a = sin(deltaLat)^2 + cos(long1) * cos(long2) * sin(deltaLong/2)^2
		c = 2 * atan(sqrt(a), sqrt(1-a))
		d = 6371 * c
	*/
}
// [
// 	{userId: 1, location: [], overallRating: 5, skillRating: 5, interests: []}
// ]

let userValues = generateRandomUsers()

//importance of each attribute.  interests are worth twice as much as the
// overall rating or the skill rating
let prefs = {overallRating: 5, skillRating: 2.5, interests: 7.5}

let exampleUser = userValues[0]

// The custom sort function compares two users based on their aggregated score.
// We calculate the interests
// score with the helper function above. we multiply each of these values
// weights with the weights we defined in the 'prefs' object
// The custom sort is expecting an integer. if the number is negative,
// the sort will put the first argument (userA) first, else it will
// put the second argument first

// console.log(`==========================> Before sorting: ${util.inspect(exampleUser, {showHidden: false, depth: null})} <=======================`);

userValues.sort((userA, userB) => {
  let numIntersectionsA = getScoreFromInterests(
    exampleUser.interests,
    userA.interests
  )
  let numIntersectionsB = getScoreFromInterests(
    exampleUser.interests,
    userB.interests
  )

  let userAScore =
    prefs.overallRating * getScoreFromOverallRating(userA.overallRating) +
    prefs.skillRating * getScoreFromSkillRating(userA.skillRating) +
    numIntersectionsA * prefs.interests

  let userBScore =
    prefs.overallRating * getScoreFromOverallRating(userB.overallRating) +
    prefs.skillRating * getScoreFromSkillRating(userB.skillRating) +
    numIntersectionsB * prefs.interests

  userA.intersections = numIntersectionsA
  userB.intersections = numIntersectionsB
  userA.score = userAScore
  userB.score = userBScore

  return userBScore - userAScore
})

// const mapVals = userValues.map(elem => {
// 	return {interests: elem.interests, intersections: elem.intersections}
// });

module.exports = {
  userInterestsToSet,
  getScoreFromInterests,
  getScoreFromOverallRating,
  getScoreFromInterestsObject,
  getScoreFromSkillRating,
  getScoreFromLocation,
  prefs
}
