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

const reviewList = [
  'Trash',
  'Great',
  'Not my style, but might be good for others',
  'Really genuine person. Cannot wait to see them again',
  'Too serious',
  'Needs to wear deodorant',
  'Amazing experience',
  'Had lots of fun',
  'Would definitely recommend!',
  'Wow',
  'Kind of an awkward person',
  'Very skilled and also a great communicator',
  'Overall OK',
  'Great communication skills',
  'Very Polite',
  'Trustworthy',
  'Great Swap',
  'Good person',
  'Bad hygiene',
  'Great enthusiasm',
  'Good insight',
  'Overall satisfied with the swap',
  'Good job!',
  'Thanks!',
  'Hope to see you again soon!',
  'Would highly recommend',
  'Would highly discourage from swapping with this person',
  'Argumentative',
  'Untrustworthy vibes',
  'Bad swap',
  'Overall OK swap',
  'Not my vibe',
  'Was not as good as I expected',
  'Such a genuine person.',
  'Has a positive energy',
  'Has a contagious positive energy',
  'Was very lucky to meet this person',
  'Amazing',
  'Good conversation'
]

const numberOfServices = 154
function generateReviews() {
  const reviews = []
  for (let i = 0; i < 1000; i++) {
    reviews.push({
      rating: Math.ceil(Math.random() * 5) * 1.0,
      comment: reviewList[Math.floor(Math.random() * reviewList.length)],
      serviceId: Math.ceil(Math.random() * numberOfServices),
      userId: Math.ceil(Math.random() * (totalUsersToFake + 4))
    })
  }
  return reviews
}

function generateUsers(num) {
  const users = []
  for (let i = 5; i < num + 5; i++) {
    const firstName = casual.first_name
    const lastName = casual.last_name
    users.push({
      firstName,
      lastName,
      email: `${firstName + lastName}@email.com`,
      phoneNumber: casual.phone,
      password: '123',
      bio: casual.sentences(2),
      zipCode: Number(casual.zip(5))
      // overallRating: 1 + 4 * Math.random(),
      // reviewCount: 1
    })
  }
  return users
}

function generateServices(num) {
  const services = []
  for (let i = 5; i < num * 3 + 5; i++) {
    services.push({
      serviceCategoryId: Math.ceil(Math.random() * 7),
      userId: 1 + Math.floor(Math.random() * (num + 4)),
      name: servicesList[Math.floor(Math.random() * servicesList.length)],
      description: casual.text,
      proficiency: Math.ceil(Math.random() * 3),
      remote: casual.coin_flip
      // serviceRating: Math.floor(5 * Math.random()),
      // reviewCount: 1
    })
  }
  return services
}

const fakeUsers = generateUsers(totalUsersToFake)
const fakeServices = generateServices(totalUsersToFake)
const fakeReviews = generateReviews(numberOfServices)

module.exports = {
  fakeUsers,
  fakeServices,
  generateUsers,
  generateServices,
  fakeReviews
}
