const Sequelize = require('sequelize')
const db = require('../db')

const Swap = db.define('swap', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  swapDate: {
    type: Sequelize.DATE
  },
  swapStatus: {
    type: Sequelize.ENUM,
    values: ['Pending', 'Completed', 'Active', 'Cancelled'],
    defaultValue: 'Pending'
  },
  requesterServiceId: {
    type: Sequelize.INTEGER
  },
  responderServiceId: {
    type: Sequelize.INTEGER
  },
  requesterServiceReviewed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  responderServiceReviewed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  location: {
    type: Sequelize.TEXT
  },
  requesterId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
    unique: false
  },
  responderId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
    unique: false
  }
})

module.exports = Swap
