const Sequelize = require('sequelize')
const db = require('../db')

const ServiceCategory = db.define('serviceCategory', {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = ServiceCategory
