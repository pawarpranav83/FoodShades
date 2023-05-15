const mongoose = require('mongoose');
const Restaurant = require('./restaurantModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      // required: [true, 'Review cannot be empty.'],
    },
    rating: {
      type: Number,
      min: [1, 'Min rating must be 1'],
      max: [5, 'Max rating must be 5'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Review must belong to a Restaurant'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a User'],
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: 'Orders',
      required: [true, 'Review must belong to an Order'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ restaurant: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  //   this.populate({ path: 'restaurant', select: 'name' }).populate({
  //     path: 'user',
  //     select: 'name photo',
  //   });

  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (restaurantId) {
  const stats = await this.aggregate([
    {
      $match: { restaurant: restaurantId },
    },
    {
      $group: {
        _id: '$restaurant',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  // console.log(stats);

  if (stats.length > 0)
    await Restaurant.findByIdAndUpdate(restaurantId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  else
    await Restaurant.findByIdAndUpdate(restaurantId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
};

reviewSchema.post('save', async (docs, next) => {
  await docs.constructor.calcAverageRatings(docs.restaurant);
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
