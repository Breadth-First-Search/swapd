const Sequelize = require('sequelize')
const db = require('../db')

const Interest = db.define('interest', {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = Interest
