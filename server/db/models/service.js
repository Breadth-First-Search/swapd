const Sequelize = require('sequelize')
const db = require('../db')

const Service = db.define('service', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  description: {
    type: Sequelize.TEXT
  },
  proficiency: {
    type: Sequelize.INTEGER,
    validate: {min: 0, max: 5}
  },
  remote: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Service
