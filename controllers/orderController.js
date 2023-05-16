const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factoryHandler');

exports.getAllOrders = factory.getAll(Order);
exports.createOrder = factory.createOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.getOrder = factory.getOne(Order);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/orderPlaced/${
      order._id
    }`,
    cancel_url: `${req.protocol}://${req.get('host')}/orderDel/${order._id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.orderId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: order.totalPrice,
          product_data: {
            name: `${order.restaurant.name}`,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.webhookCheckout = async (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  const session = event.data.object;

  if (!(event.type === 'checkout.session.completed')) {
    await Order.findByIdAndDelete(session.client_reference_id);
  }

  res.status(200).json({ received: true });
};
