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

const imageUrls = [
  'https://ca.slack-edge.com/T024FPYBQ-UNVS3D1CL-72903580eea7-512',
  'https://ca.slack-edge.com/T024FPYBQ-U4837KX9Q-6cf4b0197f03-512',
  'https://ca.slack-edge.com/T024FPYBQ-U0T06NJ3X-38881f57d249-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULLV05XDF-2fe0cba62c9e-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPQMR7DMZ-658921fc3d6e-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPQMRBT6F-efbb1cb56141-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPU8R9EPK-cd2a22172359-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULT9G51KJ-9663832b4ebe-512',
  'https://ca.slack-edge.com/T024FPYBQ-UMRL9PW56-d9abe093b390-512',
  'https://ca.slack-edge.com/T024FPYBQ-U024FPYBS-gcd5248cc625-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULSR7KVMJ-135ef8ab4809-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ265EK40-gab148043d14-512',
  'https://ca.slack-edge.com/T024FPYBQ-U6C9ZFFK2-g56bb2d17402-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPU8R414H-113762322dc0-512',
  'https://ca.slack-edge.com/T024FPYBQ-U028RRRRH-ga46faf6969c-512',
  'https://ca.slack-edge.com/T024FPYBQ-UM9DQ1L5A-27124cabfef7-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ1MX514L-b770aa7afde7-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULVE17K1U-9c9fc00aa4e7-512',
  'https://ca.slack-edge.com/T024FPYBQ-U028EUYFP-34357868f35c-512',
  'https://ca.slack-edge.com/T024FPYBQ-UAV23HH2A-db862acd7a95-512',
  'https://ca.slack-edge.com/T024FPYBQ-UKF6C461L-8e3bd8dd922e-512',
  'https://ca.slack-edge.com/T024FPYBQ-UH3RW9YE9-10586ff2ce97-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ265BSKS-2cf611e071cc-512',
  'https://ca.slack-edge.com/T024FPYBQ-UJV3UUK32-f8acca72f250-512',
  'https://ca.slack-edge.com/T024FPYBQ-UDPFZ5N5R-88905aa80df5-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ41YD63Z-f43a7eabb457-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPPCHCB42-3fa355f24901-512',
  'https://ca.slack-edge.com/T024FPYBQ-UBV6KAPMZ-992b2fa4a605-512',
  'https://ca.slack-edge.com/T024FPYBQ-UP6B6RNUS-fa4f60e626b2-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPQMR0MFV-5ad2bc53e607-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ4CB7UAJ-gb42a8699b6f-512',
  'https://ca.slack-edge.com/T024FPYBQ-UHF7SFX1P-71576b1c3c80-512'
]

const serviceImageUrl = [
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1572538249746-d2c1c26ba264?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1508090262849-891361a906e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1500917832468-298fa6292e2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1463567517034-628c51048aa2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1551218371-bc055a9c1487?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1477039181047-efb4357d01bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1514996937319-344454492b37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1544847558-3ccacb31ee7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1527248340554-4c41da8eff7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1497470674350-dad852ead0eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1555436169-20e93ea9a7ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1504836054726-3e36882ddaf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1503832725-c34828469568?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1511920922889-5c35bfd95a7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1523225918988-00624e6d8fee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1497190430210-ef621bd9955b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
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
      zipCode: Number(casual.zip(5)),
      photo: imageUrls[Math.floor(Math.random() * imageUrls.length)]
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
      remote: casual.coin_flip,
      // serviceRating: Math.floor(5 * Math.random()),
      // reviewCount: 1
      imageUrl:
        serviceImageUrl[Math.floor(Math.random() * serviceImageUrl.length)]
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
