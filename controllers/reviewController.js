const Review = require('../models/reviewModel');
const factory = require('./factoryHandler');

exports.setRestaurantUserIds = (req, res, next) => {
  // ALlow nested routes
  if (!req.body.restaurant) req.body.restaurant = req.params.restaurantId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.getReview = factory.getOne(Review);
