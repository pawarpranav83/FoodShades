const mongoose = require('mongoose');
const slugify = require('slugify');

// const User = require('./userModel');

// const travelTimeCalc = async () => {
//   const travelTime = await fetch(
//     'https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=summary&apikey=WF3JYBilnaV0A-ceCT15hQ'
//   );
// };

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Restaurant must have a name'],
      unique: true,
    },
    foodTypes: [
      {
        type: String,
        required: [
          true,
          'Restaurant must specify the types of food that they serve',
        ],
      },
    ],
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    deliveryTime: {
      type: String,
      default: '--',
    },
    imageCover: {
      type: String,
      default: 'pizza.jpg',
    },
    dishes: [
      {
        name: {
          type: String,
          required: [true, 'A dish must have a name'],
          // unique: true,
        },
        image: String,
        description: {
          type: String,
          required: [true, 'A dish must have a description'],
        },
        veg: {
          type: Boolean,
          required: [true, 'A dish must have a veg/non-veg specified'],
        },
        price: {
          type: Number,
          required: [true, 'A dish must have a price'],
        },
      },
    ],
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Error Min Rating'],
      max: [5, 'Error Max Rating'],
      default: 4.5,
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    slug: String,
    onlyVeg: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

restaurantSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'restaurant',
  localField: '_id',
});

// restaurantSchema.pre('save', function (next) {
//   console.log(this);
//   next();
// });

restaurantSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

restaurantSchema.pre(/^find/, function (next) {
  this.populate('owner');
  next();
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
