const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  text: {
    type: Sequelize.TEXT,
    defaultValue: '',
    allowNull: false
  },
  requesterId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  responderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM,
    values: ['MESSAGE', 'CURRENT_OFFER', 'OLD_OFFER', 'CONFIRMED_OFFER'],
    defaultValue: 'MESSAGE',
    allowNull: false
  }
})

module.exports = Message
