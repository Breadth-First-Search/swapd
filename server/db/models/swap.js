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
    type: Sequelize.STRING,
    defaultValue: 'open'
  },
  requesterServiceId: {
    type: Sequelize.INTEGER
  },
  responderServiceId: {
    type: Sequelize.INTEGER
  },
  location: {
    type: Sequelize.TEXT
  }
})

module.exports = Swap
