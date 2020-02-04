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
    type: Sequelize.STRING
  },
  videoUrl: {
    type: Sequelize.STRING
  },
  serviceRating: {
    type: Sequelize.FLOAT
  }
})

module.exports = Service
