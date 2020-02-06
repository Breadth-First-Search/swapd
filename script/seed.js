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
const {fakeUsers, fakeServices, fakeReviews} = require('./seedGenerator')
const {interestsList} = require('../server/algorithm')

//returns an array of objects to bulkCreate interests
function interestHelper(interests) {
  return interests.map(interest => {
    return {name: interest}
  })
}

//returns an array of objects to bulkCreate userInterests
function interestJoinTableHelper(users) {
  const allJoins = []
  for (let j = 1; j <= users.length; j++) {
    let seenInterests = new Set()
    for (
      let i = 0;
      i < Math.floor(Math.random() * interestsList.length / 3);
      i++
    ) {
      let interestId = 1 + Math.floor(Math.random() * interestsList.length)
      if (!seenInterests.has(interestId)) {
        allJoins.push({
          userId: j,
          interestId: interestId
        })
      }
      seenInterests.add(interestId)
    }
  }
  return allJoins
}

async function seed() {
  //why is there another db force true here
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all([
    User.create({
      firstName: 'Ming',
      lastName: 'Juan',
      email: 'ming@email.com',
      phoneNumber: '742-829-2102',
      password: '123',
      bio: 'Always be coding and dancing. Looking for a dance instructor.',
      zipCode: 10013,
      // overallRating: Math.random() * 5,
      photo:
        'https://media-exp1.licdn.com/dms/image/C4D03AQHLPMcfEo_0cg/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=6Nv1THz7yOFdWq5a_JbSc9_g1Vaf41BeaNgyGGC2lnk'
    }),
    User.create({
      firstName: 'Jasen',
      lastName: 'Chan',
      email: 'jasen@email.com',
      phoneNumber: '368-652-5643',
      password: '123',
      bio:
        'Loves to do algo problems. Can solve them in my sleep. Looking for expert algo partner.',
      zipCode: 11210,
      // overallRating: Math.random() * 5,
      photo:
        'https://media-exp1.licdn.com/dms/image/C4E03AQHvTsT5W_L28w/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=Cra3SIEwfs9MA_FlUHbV0RbdbNTnkj6viqatDvzPjOc'
    }),
    User.create({
      firstName: 'Leo',
      lastName: 'Yoshinaga',
      email: 'leo@email.com',
      phoneNumber: '876-456-3334',
      password: '123',
      bio: 'Unsure of how to grow out my hair. Looking for stylist.',
      zipCode: 10016,
      // overallRating: Math.random() * 5,
      photo:
        'https://media-exp1.licdn.com/dms/image/C4D03AQHE15W8Q8k4rw/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=x1ZcAHDTWMh6rg1OB3Nf3_gKn7F4OnpCC00CmDTkMdQ'
    }),
    User.create({
      firstName: 'Erik',
      lastName: 'Jenson',
      email: 'erik@email.com',
      phoneNumber: '245-565-8975',
      password: '123',
      bio:
        'A husband and father taking on the challenge of bootcamp to learn to code. Looking for experts to teach me more about Javascript.',
      zipCode: 11231,
      // overallRating: Math.random() * 5,
      photo:
        'https://media-exp1.licdn.com/dms/image/C4E03AQGUKzYIpj4byw/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=obQUxzS912_aIqYEhXe3iOwHb4-bN70X_nfMgBOVBxA'
    })
  ])

  const users = await User.bulkCreate(fakeUsers)

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
      serviceCategoryId: 2,
      userId: 1,
      name: 'Dance Lessons',
      description: 'Learn the basics of dance over 2 hours.',
      proficiency: 1,
      remote: false,
      photo: 'mingdance.png',
      serviceRating: Math.random() * 5
    }),
    Service.create({
      serviceCategoryId: 1,
      userId: 2,
      name: 'Algo Practice',
      description: 'Solve medium to hard algorithms over 3 hours.',
      proficiency: 3,
      remote: true,
      photo: 'algorithm.jpg',
      serviceRating: Math.random() * 5
    }),
    Service.create({
      serviceCategoryId: 1,
      userId: 3,
      name: 'Data Structures',
      description:
        'Understand the basics of data structures before tackling algo problems.',
      proficiency: 1,
      remote: true,
      photo: 'algorithm.jpg',
      serviceRating: Math.random() * 5
    }),
    Service.create({
      serviceCategoryId: 2,
      userId: 4,
      name: 'Dad Hacks',
      description:
        'Learn the secrets of being a great and time efficient dad. The essential guide on how to survive coding bootcamp while taking care of your family.',
      proficiency: 1,
      remote: true,
      photo: 'algorithm.jpg',
      serviceRating: Math.random() * 5
    })
  ])

  await Service.bulkCreate(fakeServices)

  await Promise.all([
    Swap.create({
      swapDate: new Date(2020, 1, 1),
      swapStatus: 'completed',
      requesterId: 1,
      responderId: 2,
      requesterServiceId: 1,
      responderServiceId: 2,
      location: 'Fullstack Academy'
    }),
    Swap.create({
      swapDate: new Date(2020, 2, 1),
      swapStatus: 'pending',
      requesterId: 3,
      responderId: 4,
      requesterServiceId: 3,
      responderServiceId: 4,
      location: ''
    }),
    Swap.create({
      id: 3,
      swapDate: new Date(2020, 1, 1),
      swapStatus: 'completed',
      requesterId: 1,
      responderId: 2,
      requesterServiceId: 1,
      responderServiceId: 2,
      location: 'Fullstack Academy'
    })
  ])

  await Promise.all([
    Message.create({
      userId: 1,
      swapId: 1,
      text: 'Hello',
      requesterId: 1,
      responderId: 2
    }),
    Message.create({
      userId: 2,
      swapId: 1,
      text: 'Hi',
      requesterId: 1,
      responderId: 2
    }),
    Message.create({
      userId: 1,
      swapId: 1,
      text:
        'Would love to practice on algo problems with you. Would you like to learn dancing?',
      requesterId: 1,
      responderId: 2
    }),
    Message.create({
      userId: 2,
      swapId: 1,
      text: 'I definitely would love to.',
      requesterId: 1,
      responderId: 2
    }),
    Message.create({
      userId: 1,
      swapId: 1,
      text: 'Cool is Feb 2nd at 3pm at Fullstack okay?',
      requesterId: 1,
      responderId: 2
    }),
    Message.create({
      userId: 2,
      swapId: 1,
      text: 'Sounds good to me',
      requesterId: 1,
      responderId: 2
    }),
    Message.create({
      swapId: 3,
      text: 'Testing',
      requesterId: 1,
      responderId: 2
    }),
    Message.create({
      swapId: 3,
      text: 'Testing again',
      requesterId: 1,
      responderId: 2
    })
  ])

  // await Promise.all([
  //   Review.create({
  //     rating: 5,
  //     comment: 'The best dance lessons ever',
  //     serviceId: 1
  //   }),
  //   Review.create({
  //     rating: 3,
  //     comment:
  //       'Eh I am okay with the service, great guy but nothing new for me.',
  //     serviceId: 1
  //   }),
  //   Review.create({
  //     rating: 1,
  //     comment: 'Absolutely garbage.',
  //     serviceId: 1
  //   }),
  //   Review.create({
  //     rating: 2,
  //     comment:
  //       'Too hard for me, wished the description of the service was more specific on what to expect.',
  //     serviceId: 2
  //   }),
  //   Review.create({
  //     rating: 5,
  //     comment:
  //       'Loved the experience! Jasen is incredibly good at algos and would swap with him again!',
  //     serviceId: 2
  //   }),
  //   Review.create({
  //     rating: 4,
  //     comment: 'Learned a lot from this swap. Wished it was longer though.',
  //     serviceId: 2
  //   })
  // ])

  await Interest.bulkCreate(interestHelper(interestsList))
  await UserInterest.bulkCreate(interestJoinTableHelper(users))
  for (let i = 0; i < fakeReviews.length; i++) {
    await Review.create(fakeReviews[i])
  }

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
