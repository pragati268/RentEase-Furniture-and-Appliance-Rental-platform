// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },

//   description: {
//     type: String,
//     required: true,
//   },

//   price: {
//     type: Number,
//     required: true,
//   },

//   image: {
//     url: String,
//     required: true,
//   },

//   pricePerDay: {
//     type: Number,
//     required: true,
//   },

//   pricePerMonth: {
//     type: Number,
//     required: true,
//   },

//   securityDeposit: {
//     type: Number,
//     required: true
//   },

//   category: {
//     type: String,
//     enum: ["furniture", "appliances"],
//     required: true,
//   },

//   isAvailable: {
//     type: Boolean,
//     default: true,
//   },

//   stock: {
//     type: Number,
//     required: true,
//   },

//   city: {
//     type: String,
//     required: true,
//   },   

//   ratings: {
//     type: Number,
//     default: 0,
//   },

//   numOfReviews: {
//     type: Number,
//     default: 0,
//   }
// }, { timestamps: true });

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;
