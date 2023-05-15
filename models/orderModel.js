const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Order must belong to a restaurant'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Order must have a price'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  dishes: [
    {
      name: {
        type: String,
        // required: [true, 'A dish must have a name'],
        // unique: true,
      },
      image: String,
      veg: Boolean,
      price: Number,
      quantity: Number,
      description: String,
    },
  ],
});

ordersSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'restaurant',
    select: 'name location',
  });
  next();
});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
