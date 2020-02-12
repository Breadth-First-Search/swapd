const Sequelize = require('sequelize')
const db = require('../db')

const Swap = db.define('swap', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  swapDate: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    allowNull: false
  },
  swapStatus: {
    type: Sequelize.ENUM,
    values: ['Pending', 'Completed', 'Active', 'Cancelled'],
    defaultValue: 'Pending',
    allowNull: false
  },
  requesterServiceId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  responderServiceId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  requesterServiceReviewed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  responderServiceReviewed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING
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
