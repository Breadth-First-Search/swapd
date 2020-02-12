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
    defaultValue: 1
  },
  remote: {
    type: Sequelize.BOOLEAN
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
  },
  videoUrl: {
    type: Sequelize.STRING
  },
  serviceRating: {
    type: Sequelize.FLOAT,
    defaultValue: 3.5
  },
  reviewCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Service
