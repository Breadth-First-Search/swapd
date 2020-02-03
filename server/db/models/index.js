const User = require('./user')
const Interest = require('./interest')
const Message = require('./message')
const Review = require('./review')
const Service = require('./service')
const Swap = require('./swap')
const UserInterest = require('./userInterest')
const Exchange = require('./exchange')
const ServiceCategory = require('./serviceCategory')

User.belongsToMany(User, {
  through: Swap,
  as: 'Requester',
  foreignKey: 'requesterId',
  otherId: 'swapId'
})
User.belongsToMany(User, {
  through: Swap,
  as: 'Responder',
  foreignKey: 'responderId',
  otherId: 'swapId'
})

Message.belongsTo(User)
User.hasMany(Message)

Message.belongsTo(Swap)
Swap.hasMany(Message)

User.belongsToMany(Interest, {through: UserInterest})
Interest.belongsToMany(User, {through: UserInterest})

Service.belongsTo(User)
User.hasMany(Service)

Service.belongsTo(ServiceCategory)
ServiceCategory.hasMany(Service)

Review.belongsTo(Service)
Service.hasMany(Review)

Exchange.belongsTo(Swap)
Swap.hasMany(Exchange)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Interest,
  Message,
  Review,
  Service,
  ServiceCategory,
  Swap,
  UserInterest
}
