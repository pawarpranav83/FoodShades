const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoute');

const router = express.Router();

router.use('/:restaurantId/reviews', reviewRouter);

router.use(authController.protect);

router
  .route('/')
  .get(restaurantController.getAllRestaurants)
  .post(
    authController.restrictTo('admin', 'owner'),
    restaurantController.createRestaurant
  );

router
  .route('/:id')
  .get(restaurantController.getRestaurant)
  .patch(
    authController.restrictTo('admin', 'owner'),
    restaurantController.updateRestaurant
  )
  .delete(
    authController.restrictTo('admin'),
    restaurantController.deleteRestaurant
  );

router
  .route('/:restId/:dishId')
  .get(restaurantController.getDish)
  // .patch(restaurantController.updateDish);

module.exports = router;
