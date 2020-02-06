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

Message.belongsTo(User, {
  as: 'requester',
  foreignKey: 'requesterId'
})

Message.belongsTo(User, {
  as: 'responder',
  foreignKey: 'responderId'
})

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

Review.beforeCreate(async (review, options) => {
  const reviewedService = await Service.findByPk(review.serviceId)
  const reviewedUser = await User.findByPk(reviewedService.userId)

  if (reviewedUser.reviewCount === 0) {
    reviewedUser.overallRating = review.rating

    await reviewedUser.save()
  } else {
    reviewedUser.overallRating =
      (reviewedUser.overallRating * reviewedUser.reviewCount +
        review.rating * 1.0) /
      (reviewedUser.reviewCount + 1)
    await reviewedUser.save()
  }

  if (reviewedService.reviewCount === 0) {
    reviewedUser.serviceRating = review.rating
    await reviewedService.save()
  } else {
    reviewedService.serviceRating =
      (reviewedService.serviceRating * reviewedService.reviewCount +
        review.rating) /
      (reviewedService.reviewCount + 1)
    await reviewedService.save()
  }

  await reviewedUser.increment('reviewCount', {by: 1})
  await reviewedService.increment('reviewCount', {by: 1})

  console.log('after', reviewedUser.reviewCount)

  // await reviewedUser.update({
  //   reviewCount: reviewedUser.reviewCount+1
  // })

  // await reviewedService.update({
  //   reviewCount: reviewedService.reviewCount+1
  // })
  //before adding the review. calculate the new average for the specific skill
  //rating. then calculate the new average for the overall rating. then update on
  //the user model and the service model.
  // await User.findByPk()
})

// Review.beforeBulkCreate(function(reviewArray) {
//   reviewArray.forEach(async review => {
//     try{

//       const reviewedService = await Service.findByPk(review.dataValues.serviceId)

//       console.log(reviewedService)
//       const reviewedUser = await User.findByPk(reviewedService.userId)
//       await reviewedUser.increment('reviewCount', {by: 1})
//       await reviewedService.increment('reviewCount', {by: 1})
//     }catch(error){
//       console.error(error)
//     }

//     // await reviewedUser.update({
//     //   reviewCount: reviewedUser.reviewCount + 1
//     // })

//     // await reviewedService.update({
//     //   reviewCount: reviewedService.reviewCount + 1
//     // })
//   })
// })
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
//dlkjasf
