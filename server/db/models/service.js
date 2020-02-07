const Sequelize = require('sequelize')
const db = require('../db')

const Service = db.define('service', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  proficiency: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  remote: {
    type: Sequelize.BOOLEAN
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  videoUrl: {
    type: Sequelize.STRING
  },
  serviceRating: {
    type: Sequelize.FLOAT,
    defaultValue: 3.0
  },
  reviewCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Service
