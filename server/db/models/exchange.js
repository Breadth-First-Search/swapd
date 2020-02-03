const Sequelize = require('sequelize')
const db = require('../db')

const Exchange = db.define('exchange', {
  userId: {
    type: Sequelize.INTEGER
  },
  serviceGiven: {
    type: Sequelize.STRING
  },
  serviceRecieved: {
    type: Sequelize.STRING
  }
})

module.exports = Exchange
