const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.isLoggedIn);

router.get('/', viewController.getIndex);
router.get('/login', authController.isLoggedIn, viewController.getLogin);
router.get('/signup', viewController.getSignup);
router.get('/loginRestaurant', viewController.getLoginRestaurant);

// router.use(authController.protect);

router.get('/overview', authController.protect, viewController.getOverview);
router.get(
  '/pastOrders/:userId',
  authController.protect,
  viewController.getPastOrders
);
router.get(
  '/restaurant/:slug',
  authController.protect,
  viewController.getRestaurant
);
router.get('/me', authController.protect, viewController.getAccount);
router.get(
  '/orderPlaced/:id',
  authController.protect,
  viewController.getOrderPlaced
);
router.get(
  '/restaurantOwner/:restaurantId',
  authController.protect,
  viewController.getRestaurantOwner
);

router.get(
  '/orderDel/:orderId',
  authController.protect,
  viewController.deleteOrder
);

module.exports = router;
