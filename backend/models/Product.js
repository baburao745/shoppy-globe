const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: false,
  },

  category: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },

  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },

  availabilityStatus: {
    type: String,
    required: true,
  },

  minimumOrderQuantity: {
    type: Number,
    required: true,
    min: 1,
  },

  sku: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Product", productSchema);