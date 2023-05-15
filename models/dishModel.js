// const mongoose = require('mongoose');
// const slugify = require('slugify');

// const dishSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Dish must have a name'],
//     unique: true,
//   },
//   location: {
//     type: {
//       type: String,
//       default: 'Point',
//       enum: ['Point'],
//     },
//     coordinates: [Number],
//     address: String,
//     description: String,
//   },
//   deliveryTime: {
//     type: String,
//     default: '--',
//   },
//   imageDish: {
//     type: String,
//   },
//   description: {
//     type: String,
//     required: [true, 'Dish must have a description'],
//   },
//   veg: {
//     type: Boolean,
//     required: [true, 'Dish must have a veg/non-veg specified'],
//   },
//   price: {
//     type: Number,
//     required: [true, 'Dish must have a price'],
//   },
// });

// const Dish = mongoose.model('Dish', dishSchema);

// module.exports = Dish;
