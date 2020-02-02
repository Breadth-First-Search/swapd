'use strict'

var casual = require('casual')
var totalUsersToFake = 50

function generateUsers(num) {
  const users = []
  for (let i = 5; i < num + 5; i++) {
    const firstName = casual.first_name
    const lastName = casual.last_name
    users.push({
      id: i,
      firstName,
      lastName,
      email: `${firstName + lastName}@email.com`,
      phoneNumber: casual.phone,
      password: '123',
      bio: casual.sentences(2),
      zipCode: casual.zip(5),
      distancePrefWeight: Math.random() * Math.floor(50),
      sharedInterestWeight: Math.random() * Math.floor(1),
      overallRating: Math.random() * Math.floor(5)
    })
  }
  return users
}

function generateServices(num) {
  const services = []
  for (let i = 5; i < num + 5; i++) {
    services.push({
      id: i,
      serviceCategoryId: Math.ceil(Math.random() * 7),
      userId: i,
      name: casual.title,
      description: casual.text,
      proficiency: Math.ceil(Math.random() * 3),
      remote: casual.coin_flip
    })
  }
  return services
}

function generateUserInterests(num) {
  const userInterests = []
  for (let i = 5; i < num + 5; i++) {
    userInterests.push({
      userId: i,
      interestId: Math.ceil(Math.random() * 13)
    })
  }
  return userInterests
}

const fakeUsers = generateUsers(totalUsersToFake)
const fakeServices = generateServices(totalUsersToFake)
const fakeUserInterests = generateUserInterests(totalUsersToFake)

module.exports = {fakeUsers, fakeServices, fakeUserInterests}
