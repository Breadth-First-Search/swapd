const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const zipcodes = require('zipcodes')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.STRING
  },
  bio: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.asbmb.org/img/content-images/generic-user.jpg'
  },
  zipCode: {
    type: Sequelize.INTEGER,
    validate: {
      len: [5]
    },
    allowNull: false
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  distancePrefWeight: {
    type: Sequelize.FLOAT,
    defaultValue: 20
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  overallRating: {
    type: Sequelize.FLOAT,
    defaultValue: 3.5,
    allowNull: false
  },
  reviewCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    },
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})
//this sets long and lat based on zip.
//may be a better way to make sure a correct zip was entered
User.beforeCreate(function(user) {
  if (user.zipCode) {
    const zip = zipcodes.lookup(user.zipCode)
    if (zip.latitude) {
      user.latitude = zip.latitude
      user.longitude = zip.longitude
    }
  }
})

//same function above but for bulkCreate
User.beforeBulkCreate(function(user) {
  user.forEach(eachUser => {
    if (eachUser.dataValues.zipCode) {
      const zip = zipcodes.lookup(eachUser.dataValues.zipCode)
      if (zip) {
        eachUser.dataValues.latitude = zip.latitude
        eachUser.dataValues.longitude = zip.longitude
      }
    }
  })
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
