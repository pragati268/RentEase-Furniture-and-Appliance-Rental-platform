import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    url: String,
    // required: true,
  },

  pricePerDay: {
    type: Number,
    required: true,
  },

  pricePerMonth: {
    type: Number,
    required: true,
  },

  securityDeposit: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    enum: ["furniture", "appliance"],
    required: true,
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },   

  ratings: {
    type: Number,
    default: 0,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const productModel = mongoose.model("Product", productSchema);

export default productModel;
