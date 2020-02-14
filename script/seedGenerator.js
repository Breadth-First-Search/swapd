'use strict'

var casual = require('casual')
var totalUsersToFake = 200

const servicesWithCategoryImage = [
  {
    name: 'HTML Tutor',
    serviceCategoryId: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'CSS Tutor',
    serviceCategoryId: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'SQL Tutoring',
    serviceCategoryId: 1,
    imageUrl:
      'https://ittutorial.org/wp-content/uploads/2019/06/sql-express.png'
  },
  {
    name: 'Python 3 Tutoring',
    serviceCategoryId: 1,
    imageUrl:
      'https://ittutohttps://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60rial.org/wp-content/uploads/2019/06/sql-express.png'
  },
  {
    name: 'Java Tutoring',
    serviceCategoryId: 1,
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/Xctw-MHSTTYicFqTjR40hXDsd1hk2o0KqeIipuVzG1GWqKS6_sJSlPPak64mQRLI4kJjOUSd_8X1uGGa6lptWnmvMBWzKyAnVVn68fF4S8MspMBtAuiMboqNuOmxWSWprQ-tJw'
  },
  {
    name: 'Japanese Tutor',
    serviceCategoryId: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1543806087-9acdd318f37d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Javascript Tutoring',
    serviceCategoryId: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
  },
  {
    name: 'Algebra Tutoring',
    serviceCategoryId: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'SAT Tutoring',
    serviceCategoryId: 1,
    imageUrl:
      'https://cdn.vox-cdn.com/thumbor/t4Oh1OAhdnT1k7FkZrAb0ap-5mo=/0x80:4004x3083/1200x675/filters:focal(0x80:4004x3083)/cdn.vox-cdn.com/uploads/chorus_image/image/48517539/shutterstock_310990577.0.0.jpg'
  },
  {
    name: 'ACT Tutoring',
    serviceCategoryId: 1,
    imageUrl:
      'https://cdn.vox-cdn.com/thumbor/t4Oh1OAhdnT1k7FkZrAb0ap-5mo=/0x80:4004x3083/1200x675/filters:focal(0x80:4004x3083)/cdn.vox-cdn.com/uploads/chorus_image/image/48517539/shutterstock_310990577.0.0.jpg'
  },
  {
    name: 'Express.js Tutoring',
    serviceCategoryId: 1,
    imageUrl: 'https://miro.medium.com/max/805/0*m1VOQP0FtcQufLgw.png'
  },
  {
    name: 'React.js Tutoring',
    serviceCategoryId: 1,
    imageUrl: 'https://reactjs.org/logo-og.png'
  },
  {
    name: 'Cantonese Translator',
    serviceCategoryId: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1542695807939-063af86fa22f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Node Tutoring',
    serviceCategoryId: 1,
    imageUrl:
      'https://colorlib.com/wp/wp-content/uploads/sites/2/nodejs-frameworks.png'
  },
  {
    name: 'Redux.js Tutoring',
    serviceCategoryId: 1,
    imageUrl:
      'https://habrastorage.org/getpro/habr/post_images/aad/f48/d2f/aadf48d2f864cef234b3b73d600dc8d1.jpg'
  },
  {
    name: 'Vocal Lessons',
    serviceCategoryId: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1554446422-d05db23719d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Piano Lessons',
    serviceCategoryId: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1522249210728-7cd95094022a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Jazz Lessons',
    serviceCategoryId: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1512053459797-38c3a066cabd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Guitar Lessons',
    serviceCategoryId: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1421217336522-861978fdf33a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Music Production',
    serviceCategoryId: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1578125769963-ef5edfa5b0fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Hair-Cutting',
    serviceCategoryId: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1565766046621-5548ffdf30af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Tattoo Design',
    serviceCategoryId: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1552627019-947c3789ffb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Nail Technician',
    serviceCategoryId: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Hair Stylist',
    serviceCategoryId: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Make-up',
    serviceCategoryId: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Personal Bartender',
    serviceCategoryId: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1571463700378-d4fd84e47d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Personal Stylist',
    serviceCategoryId: 3,
    imageUrl:
      'https://images.unsplash.com/flagged/photo-1574819521733-32f8678f8179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Modeling',
    serviceCategoryId: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Physical Therapy',
    serviceCategoryId: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Psychological Therapy',
    serviceCategoryId: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'House Makeover',
    serviceCategoryId: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Lawn Mowing',
    serviceCategoryId: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1458245201577-fc8a130b8829?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Taking Out The Trash',
    serviceCategoryId: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Window Cleaning',
    serviceCategoryId: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1547629902-e919a264f160?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'House Keeping',
    serviceCategoryId: 5,
    imageUrl:
      'https://mbm.ae/wp-content/uploads/2019/07/HOUSEKEEPING-banner.jpg'
  },
  {
    name: 'Doing The Dishes',
    serviceCategoryId: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1484632152040-840235adc262?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Nanny',
    serviceCategoryId: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1442458370899-ae20e367c5d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Personal Chef',
    serviceCategoryId: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1502364271109-0a9a75a2a9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Interior Design',
    serviceCategoryId: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1521782462922-9318be1cfd04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Basketball Lessons',
    serviceCategoryId: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Personal Training',
    serviceCategoryId: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Rock Climbing',
    serviceCategoryId: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1522079803432-e0b7649dc1de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Picture Taking',
    serviceCategoryId: 7,
    imageUrl:
      'https://images.unsplash.com/photo-1566622589760-d01f64d3f9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Caricature Drawing',
    serviceCategoryId: 7,
    imageUrl:
      'https://images.unsplash.com/photo-1562169819-9f9031fedd3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Financial Analysis',
    serviceCategoryId: 8,
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Photoshopping Any Image',
    serviceCategoryId: 8,
    imageUrl:
      'https://images.unsplash.com/photo-1498550744921-75f79806b8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Meditation Practice',
    serviceCategoryId: 9,
    imageUrl:
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Help Doing Taxes',
    serviceCategoryId: 9,
    imageUrl:
      'https://images.unsplash.com/photo-1554224155-3a58922a22c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Personal Nutritionist',
    serviceCategoryId: 9,
    imageUrl:
      'https://images.unsplash.com/photo-1548808957-e80207091212?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Social Skill Tutor',
    serviceCategoryId: 9,
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Personal Hype Man',
    serviceCategoryId: 9,
    imageUrl:
      'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Life Makeover',
    serviceCategoryId: 9,
    imageUrl:
      'https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Travel Guide',
    serviceCategoryId: 9,
    imageUrl:
      'https://images.unsplash.com/photo-1528719953625-3e95efad84da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  }
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
  'Good conversation',
  'Kindhearted and understanding',
  'Yelled in my face and made me cry',
  'Made me feel very confident in my abilities',
  'Adept at talking!',
  'I had an amazing time and learned so much',
  'I am so ready for the real world now',
  'I am ready to become a professional!',
  'Made me completely doubt my abilities',
  'Talked down to me and made me feel dumb',
  'Was a skilled conversationalist and even gave me free food',
  'I think I made a great friend!',
  'Very kind but largely unskilled',
  'I made a great friend today! Thank you Swapd!',
  'All I can think about is what I learned today!',
  'Could not have asked for a better teacher',
  'Trustworthy, effective, and efficient!',
  'Would highly recommend!',
  'Great teacher, but smelled really really bad',
  'I am a better person now',
  'I had a really fun time!',
  'I would definitely do this again!',
  'Was not very kind to me',
  'Had a bad attitude about teaching',
  'Was not cut out to teach',
  'Talked down to me constantly',
  'Really disappointed.',
  'Made me rethink my life choices...in a good way!',
  'Intense swap!',
  'Radical swap!',
  'Gnarly swap!',
  'Lit swap!',
  'Fire swap!',
  'This swap was heat, man',
  "Best swap I've had yet!",
  'Super cool person!',
  'I could not have imagined a better time',
  'Nobody is better!',
  'Taught me so much!',
  'I really had an awesome time!',
  'I would certainly do this again',
  'I grew as a person today!',
  'Kind person!',
  'Gentle teacher, yet effective!'
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
  'https://ca.slack-edge.com/T024FPYBQ-UHF7SFX1P-71576b1c3c80-512',
  'https://ca.slack-edge.com/T024FPYBQ-USHLC6129-c588e94bdd2a-512',
  'https://ca.slack-edge.com/T024FPYBQ-U1UQF9K5H-5a699dec782a-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPMENGG3S-efce845e47eb-512',
  'https://ca.slack-edge.com/T024FPYBQ-USHL165KJ-d029db07f7da-512',
  'https://ca.slack-edge.com/T024FPYBQ-UK17P4ALA-cfd1e2cca6b0-512',
  'https://ca.slack-edge.com/T024FPYBQ-US7DNDV9P-96580593d365-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPPCJ0YMQ-ac91a6a84c08-512',
  'https://ca.slack-edge.com/T024FPYBQ-USL3ASXUG-2a21227df291-512',
  'https://ca.slack-edge.com/T024FPYBQ-USFH9PFHA-036be0575d4c-512',
  'https://ca.slack-edge.com/T024FPYBQ-US60CNJCT-c88a4b7f0731-512',
  'https://ca.slack-edge.com/T024FPYBQ-USFHAGM6Y-gb6c2153ce93-512',
  'https://ca.slack-edge.com/T024FPYBQ-UT87ZRH38-b58c5c9348f6-512',
  'https://ca.slack-edge.com/T024FPYBQ-US37P9U2W-ea8333398330-512',
  'https://ca.slack-edge.com/T024FPYBQ-UNA775QQ0-f1eec78920b1-512',
  'https://ca.slack-edge.com/T024FPYBQ-UHPE71U6M-8f0ff68c41ad-512',
  'https://ca.slack-edge.com/T024FPYBQ-U9LNESD0B-bfba74b0a8d8-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ40901EK-f73e2253ab35-512',
  'https://ca.slack-edge.com/T024FPYBQ-US7DNDV9P-96580593d365-512',
  'https://ca.slack-edge.com/T024FPYBQ-USH6LMHL4-4cae9cadb96b-512',
  'https://ca.slack-edge.com/T024FPYBQ-USHLCGKD3-596fa6d55ea3-512',
  'https://ca.slack-edge.com/T024FPYBQ-USG1AGPS4-b28eb81c3d14-512',
  'https://ca.slack-edge.com/T024FPYBQ-US4GMMVB5-ad21b707f032-512',
  'https://ca.slack-edge.com/T024FPYBQ-USHSKRM5M-fddfc94ea1e0-512',
  'https://ca.slack-edge.com/T024FPYBQ-UMXDUFHGS-795a7e30d041-512',
  'https://ca.slack-edge.com/T024FPYBQ-US8RFQLER-4aafb1f6983c-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ1MYCSA0-bafaf7473a0c-512',
  'https://ca.slack-edge.com/T024FPYBQ-U64TJ8Y2X-6896a372cb77-512',
  'https://ca.slack-edge.com/T024FPYBQ-UN51PEM4Z-4ff293a01811-512',
  'https://ca.slack-edge.com/T024FPYBQ-UND9PTRGX-bbf383f05a7c-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQK8Q4UJC-96cb72100936-512',
  'https://ca.slack-edge.com/T024FPYBQ-UN51P4Q57-4ec3b0346f66-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ4CC9H6J-g8982c6e6586-512',
  'https://ca.slack-edge.com/T024FPYBQ-UMBPB4YRM-967af8ee7efd-512',
  'https://ca.slack-edge.com/T024FPYBQ-UMYLCJPQS-1292c060c695-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULV59387R-a32d90c958f2-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULKV4AJGZ-c6d777fdc6e8-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULSR44XHA-60034b94c289-512',
  'https://ca.slack-edge.com/T024FPYBQ-UND9Q1971-4c1ca6b18365-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ4CCHBT8-ad24abb3bc52-512',
  'https://ca.slack-edge.com/T024FPYBQ-UND9NTZ0X-5f60bb3e6983-512',
  'https://ca.slack-edge.com/T024FPYBQ-UNBDRBR08-f4966b23563a-512',
  'https://ca.slack-edge.com/T024FPYBQ-UHXNMSHBQ-ab308765cd22-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPQL1FE8K-6bd3413c6b1d-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPMENGG3S-efce845e47eb-512',
  'https://ca.slack-edge.com/T024FPYBQ-UNBDYEFMK-4f4d25fb813a-512',
  'https://ca.slack-edge.com/T024FPYBQ-UMZVCUYLB-9ff53dea55c2-512',
  'https://ca.slack-edge.com/T024FPYBQ-UND9PJAF9-bbf7d5ff2361-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULT9G5L1E-67fe8a565a34-512',
  'https://ca.slack-edge.com/T024FPYBQ-UHMPC9PDF-c42f7168decf-512',
  'https://ca.slack-edge.com/T024FPYBQ-U8PHVR058-b79489b26ddc-512',
  'https://ca.slack-edge.com/T024FPYBQ-UNBDR7BJL-0c32852613f9-512',
  'https://ca.slack-edge.com/T024FPYBQ-UKCKJG68M-09e45d1b549b-512',
  'https://ca.slack-edge.com/T024FPYBQ-UBW7UBJ87-b0f721539503-512',
  'https://ca.slack-edge.com/T024FPYBQ-UK1M5RMD0-5eb4e9df0021-512',
  'https://ca.slack-edge.com/T024FPYBQ-UNB03DR60-8d39434f4b9a-512',
  'https://ca.slack-edge.com/T024FPYBQ-UNG0489B8-9bbe71361ef1-512',
  'https://ca.slack-edge.com/T024FPYBQ-UNBDY73QD-e6330c41f46c-512',
  'https://ca.slack-edge.com/T024FPYBQ-UMYLE2S3U-513b93434211-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULD8TQPU2-ad9fb321ffd1-512',
  'https://ca.slack-edge.com/T024FPYBQ-UHVV33BR6-1802a1ec381a-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULFTBHJHZ-108c006597e0-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULLUZQ0E5-751e71c8662f-512',
  'https://ca.slack-edge.com/T024FPYBQ-UMYLDJV0A-f72c83f3f65d-512',
  'https://ca.slack-edge.com/T024FPYBQ-UKC6H3D7W-b5a3a5ec1387-512',
  'https://ca.slack-edge.com/T024FPYBQ-UKESHDES2-b93c9832d38c-512',
  'https://ca.slack-edge.com/T024FPYBQ-UHTRP7ZME-acbd177b908b-512',
  'https://ca.slack-edge.com/T024FPYBQ-UNDPDATPA-1d97d856010a-512',
  'https://ca.slack-edge.com/T024FPYBQ-UND9PE3V2-089e72e13d02-512',
  'https://ca.slack-edge.com/T024FPYBQ-UHJBC6Y1H-8fe7e0d10f19-512',
  'https://ca.slack-edge.com/T024FPYBQ-UDDSJHU4R-1cd2664496f5-512',
  'https://ca.slack-edge.com/T024FPYBQ-UN3QN9BUZ-5d405d7f9059-512',
  'https://ca.slack-edge.com/T024FPYBQ-UHXMFT74N-561345b9469b-512',
  'https://ca.slack-edge.com/T024FPYBQ-UND9Q03HV-7b72c22cf1f2-512',
  'https://ca.slack-edge.com/T024FPYBQ-UNBDY6T61-eed84b2ef793-512',
  'https://ca.slack-edge.com/T024FPYBQ-UNCDHUHN2-568fb8735a85-512',
  'https://ca.slack-edge.com/T024FPYBQ-UNA7DKQ13-c72800d12374-512',
  'https://ca.slack-edge.com/T024FPYBQ-UKCMP5ASU-b0a70abc0e07-512',
  'https://ca.slack-edge.com/T024FPYBQ-UKDRRGK88-50176e2b460c-512',
  'https://ca.slack-edge.com/T024FPYBQ-UDQDX910U-17d8133f9fc9-512',
  'https://ca.slack-edge.com/T024FPYBQ-UGG463YJJ-8afc516abe61-512',
  'https://ca.slack-edge.com/T024FPYBQ-UHXMA1RQW-4e8be04b082f-512',
  'https://ca.slack-edge.com/T024FPYBQ-UK1M5RMD0-5eb4e9df0021-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULYEHGC9H-97d1d2b5080b-512',
  'https://ca.slack-edge.com/T024FPYBQ-UHGL8NPD1-f0670b442851-512',
  'https://ca.slack-edge.com/T024FPYBQ-UHPMKB6JD-19083d1b23af-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULT9G43K2-0dddea9c4d5e-512',
  'https://ca.slack-edge.com/T024FPYBQ-UJFJTU70D-e57338b1f90e-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULHPTQY6N-94c94b1975e9-512',
  'https://ca.slack-edge.com/T024FPYBQ-U02EHA10S-53506d73e003-512',
  'https://ca.slack-edge.com/T024FPYBQ-UL3S1TA1G-1fb1f469bd6e-512',
  'https://ca.slack-edge.com/T024FPYBQ-UB28BPV8W-e99aaa095f3d-512',
  'https://ca.slack-edge.com/T024FPYBQ-UF7AQ4H61-6524cb0a5fa7-512',
  'https://ca.slack-edge.com/T024FPYBQ-UGFEW3YDD-396a4c5fb316-512',
  'https://ca.slack-edge.com/T024FPYBQ-UF6V43J0M-6c0e91b8b581-512',
  'https://ca.slack-edge.com/T024FPYBQ-UDPMSSNP7-f60cd810d55e-512',
  'https://ca.slack-edge.com/T024FPYBQ-UGEUDU544-7f4bf6771c31-512',
  'https://ca.slack-edge.com/T024FPYBQ-UKRMS06DR-0b70734afba3-512',
  'https://ca.slack-edge.com/T024FPYBQ-UL300A8GM-de8ab4b21689-512',
  'https://ca.slack-edge.com/T024FPYBQ-U9CTCJEMU-204c598c10e6-512',
  'https://ca.slack-edge.com/T024FPYBQ-UKZUXMNCD-ee6ee38397ac-512',
  'https://ca.slack-edge.com/T024FPYBQ-UF9LT8TT8-38d1d4fe5f12-512'
]

const interestsList = [
  'Baseball',
  'Cooking',
  'Pottery',
  'Comedy Clubs',
  'Skiing',
  'Talking',
  'Myspace',
  'TikTok',
  'Owl Watching',
  'Ice Cream',
  'Playing I Spy',
  'Apple Products',
  'Golf',
  'Country Clubbing',
  'Netflix',
  'Mathas Vineyard',
  'Reading',
  'Going to The Zoo',
  'Aquariums',
  'DOTA 2',
  'Bragging',
  'Shoplifting',
  'Meditation',
  'Watches',
  'Laundry',
  '2048',
  'Jewelry',
  'Joker Movie',
  'Elon Musk',
  'Highschool Musical',
  'Dinosaurs',
  'Bird Watching',
  'The Incredibles 1',
  'Nintendo Switch',
  'Super Smash Bros',
  'Flexing',
  'Machine Learning',
  'Apple Maps',
  'Boggle With Friends',
  'Scrabble With Friends',
  'Farmville: Darkness Rising',
  'Sims 3: Unrated',
  'Playing the Piano',
  'Teletubbies',
  'Boo-Bah',
  'Barney and Friends',
  'Rob Fox',
  'Hanging out with Eric Yang',
  'Running Marathons',
  'Avengers On Ice',
  'Traveling',
  'AlgoExpert',
  'LeetCode',
  'Transformers 2: The Musical',
  'Gambling',
  'Winnie The Pooh: Darkness Rising',
  'Squash',
  'Bocceball',
  'Volleyball',
  'Polo',
  "Where's Waldo?",
  'Jim Carrey',
  'Pet Ownership',
  'Sailing',
  'Greek Fodd',
  'Drinking Prosecco',
  'Vineyard Vines',
  'Patagonia',
  'Personal Training',
  'Snowball Fighting',
  'Pescatarianism',
  'Veganism',
  'Fast Food',
  'Bitcoin',
  'Shoe Shopping',
  'Cracking Jokes',
  '5Gum',
  'Germophobia',
  'Razor Scooters',
  'Competitve Tickling',
  'James Bond',
  'Club Getaway',
  'Club Med',
  'Getting Spray Tans',
  'Getting my nails done',
  'Giving Fist Bumps',
  'Cheech and Chong',
  'Cardio',
  'Tarantino',
  'Eternal Sunshine of a Spotless Mind',
  'Pasta with butter',
  'Glassblowing',
  'Being kind',
  'Painting Large Paintings',
  'Drawing',
  'Living In The Darkness(Shadows)',
  'Teleworking',
  'The American Flag',
  'Philanthropy',
  'Acrobatics',
  'Building Furniture',
  'Learning',
  'Shopping',
  'Lock Picking',
  'Eating a lot',
  'Career Development',
  'Cleaning the house',
  'Washing dishes',
  'Video Games',
  'Basketball',
  'Anime',
  'Comics',
  'Film',
  'Painting',
  'Dance',
  'Martial Arts',
  'Computer Programming',
  'Scuba Diving',
  'Biking',
  'Rock Climbing',
  'Hiking',
  'Dodgeball',
  'Kickball',
  'Kickboxing',
  'MMA',
  'Kung Fu-Movies',
  'Psychology',
  'Comedy',
  'History',
  'WW2',
  'The American Civil War',
  'Fashion',
  'Card Tricks',
  'Weightlifting',
  'Board Games',
  'Yu-Gi-Oh',
  'Pokemon',
  'Drowning My Demons',
  'Staring At the Ceiling',
  'Pretending',
  'Projecting',
  'Having friends',
  'Water Polo',
  'Swimming',
  'Watching Movies',
  'Getting tea',
  'Ramen',
  'Enlightenment',
  'Yoga',
  'Alternative Music',
  'Deep Conversations',
  'Doing Nails',
  'Getting my hair done',
  'Gossiping',
  'Vibing',
  'White Noise',
  'Chilling',
  'Hanging out',
  'Listening to music',
  'Trumbone',
  'Violin',
  'Competitive Sky Diving',
  'Listening to Drake',
  'Talking about Money on my bluetooth in financial district',
  'Pasta with sauce',
  'Being deep',
  'Talking about space and aliens and other deep topics',
  'Crying to Drake',
  'Algos',
  'Ping Pong Tournaments',
  'Gaming',
  'Dungeons And Dragons',
  'Crying in The Shower',
  'Magic Tricks',
  'Magic The Gathering',
  'Body Building',
  'Science Experiments',
  'Learning languages',
  'Boxing',
  'Choir',
  'Soccer',
  'Checking stocks and having no insight',
  'Reading about Start-Ups',
  'Debating',
  'Voting',
  'Prank Calling',
  'Making memes',
  'Hanging out with my stuffed animals',
  'The Illuminati',
  'Cults',
  'Secret Societies',
  'Drinking coffee',
  'Making coffee',
  'Selling used goods',
  'Politics',
  'Banking',
  'Doing my taxes',
  'Commuting',
  'Urban exploring',
  'Baking',
  'Fishing',
  'Competitve Fishing',
  'Bowling',
  'Streetwear',
  'Searching for meaning',
  'Meetups',
  'Networking',
  'LinkedIn',
  'Practicing my pitch',
  'Working on my resume',
  'Being productive at work',
  'Non-matching socks'
]

const numberOfServices = servicesWithCategoryImage.length

function generateReviews() {
  const reviews = []
  for (let i = 0; i < 3000; i++) {
    reviews.push({
      rating: 2 + Math.ceil(Math.random() * 3) * 1.0,
      comment: reviewList[Math.floor(Math.random() * reviewList.length)],
      serviceId: Math.ceil(Math.random() * (totalUsersToFake * 6 + 4)),
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
    })
  }
  return users
}

function generateServices(num) {
  const services = []
  for (let i = 5; i < num * 6 + 5; i++) {
    let serviceObj =
      servicesWithCategoryImage[
        Math.floor(Math.random() * servicesWithCategoryImage.length)
      ]
    services.push({
      userId: 1 + Math.floor(Math.random() * (num + 4)),
      name: serviceObj.name,
      description: casual.text,
      proficiency: Math.ceil(Math.random() * 3),
      remote: casual.coin_flip,
      serviceCategoryId: serviceObj.serviceCategoryId,
      imageUrl: serviceObj.imageUrl
    })
  }
  return services
}

const fakeUsers = generateUsers(totalUsersToFake)
const fakeServices = generateServices(totalUsersToFake)
const fakeReviews = generateReviews()

module.exports = {
  fakeUsers,
  fakeServices,
  generateUsers,
  generateServices,
  fakeReviews,
  interestsList
}
