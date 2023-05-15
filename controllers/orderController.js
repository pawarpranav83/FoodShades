const Order = require('../models/orderModel');
const factory = require('./factoryHandler');

exports.getAllOrders = factory.getAll(Order);
exports.createOrder = factory.createOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.getOrder = factory.getOne(Order);
