const Sequelize = require('sequelize')

const db = require('../db')
const User = require('./user')
const Service = require('./service')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    }
  },
  comment: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
})

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
    reviewedService.serviceRating = review.rating
    // reviewedService.reviewCount = reviewedService.reviewCount + 1
    await reviewedService.save()
  } else {
    reviewedService.serviceRating =
      (reviewedService.serviceRating * reviewedService.reviewCount +
        review.rating * 1.0) /
      (reviewedService.reviewCount + 1)
    // reviewedUser.reviewCount = reviewedUser.reviewCount + 1
    await reviewedService.save()
  }

  await reviewedUser.increment('reviewCount', {by: 1})
  await reviewedService.increment('reviewCount', {by: 1})

  // await reviewedUser.update({
  //   reviewCount: reviewedUser.reviewCount+1
  // })

  // await reviewedService.update({
  //   reviewCount: reviewedService.reviewCount+1
  // })
  //before adding the review. calculate the new average for the specific skill
  //rating. then calculate the new average for the overall rating. then update on
  //the user model and the service model.
})

module.exports = Review
