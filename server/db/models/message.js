const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  text: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  requesterId: {
    type: Sequelize.INTEGER
  },
  responderId: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.ENUM,
    values: ['MESSAGE', 'CURRENT_OFFER', 'OLD_OFFER', 'CONFIRMED_OFFER'],
    defaultValue: 'MESSAGE'
  }
})

module.exports = Message
