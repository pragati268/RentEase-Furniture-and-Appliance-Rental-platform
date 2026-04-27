import mongoose from "mongoose";

import bookingModel from "../models/booking-model.js";
import productModel from "../models/product-model.js";
import { calculateDays, isDateRangeValid } from "../utils/dateUtility.js";

export const createBooking = async (req, res) => {
  try {
    const { productId, startDate, endDate } = req.body;

    if (!productId || !startDate || !endDate) {
      return res.status(400).send("All fields are required");
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    if (!isDateRangeValid(startDate, endDate)) {
      return res.status(400).send("Invalid date range");
    }

    const overlapping = await bookingModel.findOne({
      product: productId,
      status: { $in: ["pending", "active"] },
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    });

    if (overlapping) {
      return res
        .status(400)
        .send("Product is already booked for the selected date range");
    }

    const days = calculateDays(startDate, endDate);

    let totalPrice;
    if (days >= 30) {
      const months = Math.ceil(days / 30);
      totalPrice = months * product.pricePerMonth; //pro-rate monthly price
    } else {
      totalPrice = days * product.pricePerDay; //pro-rate daily price
    }

    const booking = await bookingModel.create({
      user: req.user._id,
      product: productId,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });


  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const userBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find({ user: req.user._id }).populate("product");
    res.status(200).json({
      message: "User bookings retrieved successfully",
      bookings,
    });

  } catch (err) {   
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.findById(id);
    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).send("You are not the owner of this booking");
    }

    booking.status = "cancelled";
    await booking.save();
    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const allBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find().populate("user").populate("product");
    res.status(200).json({
      message: "All bookings retrieved successfully",
      bookings,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  } 
};
