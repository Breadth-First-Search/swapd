'use strict'

const db = require('../server/db')
const {
  User,
  Service,
  ServiceCategory,
  Interest,
  UserInterest,
  Message,
  Swap,
  Review
} = require('../server/db/models')
const {fakeUsers, fakeServices, fakeUserInterests} = require('./seedGenerator')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all([
    User.create({
      id: 1,
      firstName: 'Ming',
      lastName: 'Juan',
      email: 'ming@email.com',
      phoneNumber: '742-829-2102',
      password: '123',
      bio: 'Always be coding and dancing. Looking for a dance instructor.',
      zipCode: 10013,
      distancePrefWeight: Math.random() * Math.floor(50),
      sharedInterestWeight: Math.random() * Math.floor(1),
      overallRating: Math.random() * Math.floor(5)
    }),
    User.create({
      id: 2,
      firstName: 'Jasen',
      lastName: 'Chan',
      email: 'jasen@email.com',
      phoneNumber: '368-652-5643',
      password: '123',
      bio:
        'Loves to do algo problems. Can solve them in my sleep. Looking for expert algo partner.',
      zipCode: 11210,
      distancePrefWeight: Math.random() * Math.floor(50),
      sharedInterestWeight: Math.random() * Math.floor(1),
      overallRating: Math.random() * Math.floor(5)
    }),
    User.create({
      id: 3,
      firstName: 'Leo',
      lastName: 'Yoshinaga',
      email: 'leo@email.com',
      phoneNumber: '876-456-3334',
      password: '123',
      bio: 'Unsure of how to grow out my hair. Looking for stylist.',
      zipCode: 10016,
      distancePrefWeight: Math.random() * Math.floor(50),
      sharedInterestWeight: Math.random() * Math.floor(1),
      overallRating: Math.random() * Math.floor(5)
    }),
    User.create({
      id: 4,
      firstName: 'Erik',
      lastName: 'Jenson',
      email: 'erik@email.com',
      phoneNumber: '245-565-8975',
      password: '123',
      bio:
        'A husband and father taking on the challenge of bootcamp to learn to code. Looking for experts to teach me more about Javascript.',
      zipCode: 11231,
      distancePrefWeight: Math.random() * Math.floor(50),
      sharedInterestWeight: Math.random() * Math.floor(1),
      overallRating: Math.random() * Math.floor(5)
    })
  ])

  await User.bulkCreate(fakeUsers)

  await Promise.all([
    ServiceCategory.create({
      id: 1,
      name: 'Education'
    }),
    ServiceCategory.create({
      id: 2,
      name: 'Performing Arts'
    }),
    ServiceCategory.create({
      id: 3,
      name: 'Fashion'
    }),
    ServiceCategory.create({
      id: 4,
      name: 'Health'
    }),
    ServiceCategory.create({
      id: 5,
      name: 'Home'
    }),
    ServiceCategory.create({
      id: 6,
      name: 'Sports'
    }),
    ServiceCategory.create({
      id: 7,
      name: 'Creativity'
    })
  ])

  await Promise.all([
    Service.create({
      id: 1,
      serviceCategoryId: 2,
      userId: 1,
      name: 'Dance Lessons',
      description: 'Learn the basics of dance over 2 hours.',
      proficiency: 1,
      remote: false,
      photo: 'mingdance.png'
    }),
    Service.create({
      id: 2,
      serviceCategoryId: 1,
      userId: 2,
      name: 'Algo Practice',
      description: 'Solve medium to hard algorithms over 3 hours.',
      proficiency: 3,
      remote: true,
      photo: 'algorithm.jpg'
    }),
    Service.create({
      id: 3,
      serviceCategoryId: 1,
      userId: 3,
      name: 'Data Structures',
      description:
        'Understand the basics of data structures before tackling algo problems.',
      proficiency: 1,
      remote: true,
      photo: 'algorithm.jpg'
    }),
    Service.create({
      id: 4,
      serviceCategoryId: 2,
      userId: 4,
      name: 'Dad Hacks',
      description:
        'Learn the secrets of being a great and time efficient dad. The essential guide on how to survive coding bootcamp while taking care of your family.',
      proficiency: 1,
      remote: true,
      photo: 'algorithm.jpg'
    })
  ])

  await Service.bulkCreate(fakeServices)

  await Promise.all([
    Swap.create({
      id: 1,
      swapDate: new Date(2020, 1, 1),
      swapStatus: 'completed',
      requsterId: 1,
      responderId: 2,
      requesterServiceId: 1,
      responderServiceId: 2,
      location: 'Fullstack Academy'
    }),
    Swap.create({
      id: 2,
      swapDate: new Date(2020, 2, 1),
      swapStatus: 'pending',
      requsterId: 3,
      responderId: 4,
      requesterServiceId: 3,
      responderServiceId: 4,
      location: ''
    })
  ])

  await Promise.all([
    Message.create({
      id: 1,
      swapId: 1,
      text: 'Hello',
      userId: 1
    }),
    Message.create({
      id: 2,
      swapId: 1,
      text: 'Hi',
      userId: 2
    }),
    Message.create({
      id: 3,
      swapId: 1,
      text:
        'Would love to practice on algo problems with you. Would you like to learn dancing?',
      userId: 1
    }),
    Message.create({
      id: 4,
      swapId: 1,
      text: 'I definitely would love to.',
      userId: 2
    }),
    Message.create({
      id: 5,
      swapId: 1,
      text: 'Cool is Feb 2nd at 3pm at Fullstack okay?',
      userId: 1
    }),
    Message.create({
      id: 6,
      swapId: 1,
      text: 'Sounds good to me',
      userId: 2
    })
  ])

  await Promise.all([
    Review.create({
      id: 1,
      rating: 5,
      comment: 'The best dance lessons ever',
      serviceId: 1
    }),
    Review.create({
      id: 2,
      rating: 3,
      comment:
        'Eh I am okay with the service, great guy but nothing new for me.',
      serviceId: 1
    }),
    Review.create({
      id: 3,
      rating: 1,
      comment: 'Absolutely garbage.',
      serviceId: 1
    }),
    Review.create({
      id: 4,
      rating: 2,
      comment:
        'Too hard for me, wished the description of the service was more specific on what to expect.',
      serviceId: 2
    }),
    Review.create({
      id: 5,
      rating: 5,
      comment:
        'Loved the experience! Jasen is incredibly good at algos and would swap with him again!',
      serviceId: 2
    }),
    Review.create({
      id: 6,
      rating: 4,
      comment: 'Learned a lot from this swap. Wished it was longer though.',
      serviceId: 2
    })
  ])

  await Promise.all([
    Interest.create({
      id: 1,
      name: 'Coding'
    }),
    Interest.create({
      id: 2,
      name: 'Dancing'
    }),
    Interest.create({
      id: 3,
      name: 'Rock Climbing'
    }),
    Interest.create({
      id: 4,
      name: 'Driving'
    }),
    Interest.create({
      id: 5,
      name: 'Learning'
    }),
    Interest.create({
      id: 6,
      name: 'Traveling'
    }),
    Interest.create({
      id: 7,
      name: 'Design'
    }),
    Interest.create({
      id: 8,
      name: 'Video Game'
    }),
    Interest.create({
      id: 9,
      name: 'Singing'
    }),
    Interest.create({
      id: 10,
      name: 'Swimming'
    }),
    Interest.create({
      id: 11,
      name: 'Machine Learning'
    }),
    Interest.create({
      id: 12,
      name: 'Painting'
    }),
    Interest.create({
      id: 13,
      name: 'Dating'
    })
  ])

  await Promise.all([
    UserInterest.create({
      userId: 1,
      interestId: 1
    }),
    UserInterest.create({
      userId: 1,
      interestId: 2
    }),
    UserInterest.create({
      userId: 1,
      interestId: 6
    }),
    UserInterest.create({
      userId: 2,
      interestId: 1
    }),
    UserInterest.create({
      userId: 2,
      interestId: 8
    }),
    UserInterest.create({
      userId: 2,
      interestId: 11
    }),
    UserInterest.create({
      userId: 3,
      interestId: 1
    }),
    UserInterest.create({
      userId: 3,
      interestId: 11
    }),
    UserInterest.create({
      userId: 3,
      interestId: 13
    }),
    UserInterest.create({
      userId: 4,
      interestId: 1
    }),
    UserInterest.create({
      userId: 4,
      interestId: 9
    }),
    UserInterest.create({
      userId: 4,
      interestId: 12
    })
  ])

  await UserInterest.bulkCreate(fakeUserInterests)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
