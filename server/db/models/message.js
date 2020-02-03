const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  text: {
    type: Sequelize.TEXT
  },
  requesterId: {
    type: Sequelize.INTEGER
  },
  responderId: {
    type: Sequelize.INTEGER
  }
  // time: {
  //   type: 'TIMESTAMP',
  //   defaultValue: Sequelize.literal('CURRENT-TIMESTAMP'),
  //   allowNull: false
  // }
})

module.exports = Message
