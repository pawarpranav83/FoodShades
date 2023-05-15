const Restaurant = require('../models/restaurantModel');
const factory = require('./factoryHandler');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllRestaurants = factory.getAll(Restaurant);
exports.createRestaurant = factory.createOne(Restaurant);
exports.updateRestaurant = factory.updateOne(Restaurant);
exports.deleteRestaurant = factory.deleteOne(Restaurant);
exports.getRestaurant = factory.getOne(Restaurant, { path: 'reviews' });

exports.getDish = catchAsync(async (req, res, next) => {
  const query = await Restaurant.findById(req.params.restId);

  const doc = await query;

  if (!doc) return next(new AppError('No Dish found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: doc.dishes.find(
      (element) => String(element._id) === req.params.dishId
    ),
  });
});
