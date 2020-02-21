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
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
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
      'https://images.unsplash.com/photo-1499728603263-13726abce5fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
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
  'https://ca.slack-edge.com/T024FPYBQ-ULSR7KVMJ-135ef8ab4809-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ265EK40-gab148043d14-512',
  'https://ca.slack-edge.com/T024FPYBQ-U6C9ZFFK2-g56bb2d17402-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPU8R414H-113762322dc0-512',
  'https://ca.slack-edge.com/T024FPYBQ-U028RRRRH-ga46faf6969c-512',
  'https://ca.slack-edge.com/T024FPYBQ-UM9DQ1L5A-27124cabfef7-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ1MX514L-b770aa7afde7-512',
  'https://ca.slack-edge.com/T024FPYBQ-ULVE17K1U-9c9fc00aa4e7-512',
  'https://ca.slack-edge.com/T024FPYBQ-U028EUYFP-34357868f35c-512',
  'https://ca.slack-edge.com/T024FPYBQ-UKF6C461L-8e3bd8dd922e-512',
  'https://ca.slack-edge.com/T024FPYBQ-UH3RW9YE9-10586ff2ce97-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ265BSKS-2cf611e071cc-512',
  'https://ca.slack-edge.com/T024FPYBQ-UDPFZ5N5R-88905aa80df5-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ41YD63Z-f43a7eabb457-512',
  'https://ca.slack-edge.com/T024FPYBQ-UPPCHCB42-3fa355f24901-512',
  'https://ca.slack-edge.com/T024FPYBQ-UBV6KAPMZ-992b2fa4a605-512',
  'https://ca.slack-edge.com/T024FPYBQ-UP6B6RNUS-fa4f60e626b2-512',
  'https://ca.slack-edge.com/T024FPYBQ-UQ4CB7UAJ-gb42a8699b6f-512'
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
