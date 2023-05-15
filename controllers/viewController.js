const Orders = require('../models/orderModel');
const Restaurant = require('../models/restaurantModel');
const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getIndex = (req, res) => {
  res.status(200).render('index2', {
    title: 'Homepage',
  });
};

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};

exports.getLoginRestaurant = (req, res) => {
  res.status(200).render('restaurantLogin', {
    title: 'Restaurant Login',
  });
};

exports.getSignup = (req, res) => {
  res.status(200).render('signup', {
    title: 'Signup',
  });
};

exports.getOverview = catchAsync(async (req, res) => {
  const features = new APIFeatures(Restaurant.find(), req.query)
    .filter()
    .sort();
  const restaurants = await features.query;
  console.log(req.query);
  res.status(200).render('overview', {
    title: 'Overview',
    restaurants,
    query: req.query,
  });
});

exports.getPastOrders = catchAsync(async (req, res) => {
  const orders = await Orders.find({ user: req.params.userId });

  res.status(200).render('pastOrders', {
    title: 'Past Orders',
    orders,
  });
});

exports.getRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findOne({ slug: req.params.slug });

  if (!restaurant)
    return next(new AppError('There is no restaurant with that name', 404));

  res.status(200).render('restaurant', {
    title: 'Dishes',
    restaurant,
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
};

exports.getOrderPlaced = catchAsync(async (req, res) => {
  const order = await Orders.findById(req.params.id);

  res.status(200).render('orderPlaced', {
    title: 'Order',
    order,
  });
});

exports.getRestaurantOwner = catchAsync(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.restaurantId);

  res.status(200).render('restaurantOwner', {
    title: 'Restaurant',
    restaurant,
  });
});
