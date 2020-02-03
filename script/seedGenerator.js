'use strict'

var casual = require('casual')
var totalUsersToFake = 50

const servicesList = [
  'HTML Tutor',
  'CSS Tutor',
  'Lawn Mowing',
  'Modeling',
  'Picture Taking',
  'Personal Training',
  'Financial Analysis',
  'Doing The Dishes',
  'Taking Out The Crash',
  'SAT Tutoring',
  'ACT Tutoring',
  'Piano Lessons',
  'Jazz Lessons',
  'Window Cleaning',
  'House Keeping',
  'Hair-Cutting',
  'Tattoo Design',
  'Caricature Drawing',
  'Personal Chef',
  'Personal Bartender',
  'Personal Stylist',
  'Basketball Lessons',
  'Interior Design',
  'Meditation Practice',
  'Help Doing Taxes',
  'Personal Nutritionist',
  'Music Production',
  'Guitar Lessons',
  'Cantonese Translator',
  'Nanny',
  'Physical Therapy',
  'Psychological Therapy',
  'Nail Technician',
  'Hair Stylist',
  'Make-up',
  'House Makeover',
  'Japanese Tutor',
  'Life Makeover',
  'Javascript Tutoring',
  'Photoshopping Any Image',
  'SQL Tutoring',
  'Python 3 Tutoring',
  'Java Tutoring',
  'Social Skill Tutor',
  'Express.js Tutoring',
  'React.js Tutoring',
  'Node Tutoring',
  'Redux.js Tutoring',
  'Vocal Lessons',
  'Personal Hype Man',
  'Algebra Tutoring',
  'Travel Guide'
]

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
      zipCode: Number(casual.zip(5)),
      overallRating: 5 * Math.random()
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
      name: servicesList[Math.floor(Math.random * servicesList.length)],
      description: casual.text,
      proficiency: Math.ceil(Math.random() * 3),
      remote: casual.coin_flip
    })
  }
  return services
}

const fakeUsers = generateUsers(totalUsersToFake)
const fakeServices = generateServices(totalUsersToFake)

module.exports = {
  fakeUsers,
  fakeServices,
  generateUsers,
  generateServices
}
