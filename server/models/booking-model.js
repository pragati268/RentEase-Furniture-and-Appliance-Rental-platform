// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },

//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//     required: true,
//   },

//   startDate: {
//     type: Date,
//     required: true,
//   },

//   endDate: {
//     type: Date,
//     required: true,
//   },

//   totalPrice: {
//     type: Number,
//     required: true,
//   },

//   status: {
//     type: String,
//     enum: ["pending", "confirmed", "cancelled"],
//     default: "pending",
//   },

//   paymentStatus: {
//     type: String,
//     enum: ["pending", "paid", "failed"],
//     default: "pending",
//   },

//   deliveryAddress: {
//     fullName: { type: String, required: true },
//     phone: { type: Number, required: true },
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String },
//     pincode: { type: String, required: true },
//   },

//   returnedAt: {
//     type: Date,
//   },

//   lateFee: {
//     type: Number,
//     default: 0,
//   }

// }, { timestamps: true });

// const Booking = mongoose.model("Booking", bookingSchema);

// module.exports = Booking;
