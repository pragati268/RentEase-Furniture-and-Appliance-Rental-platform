import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
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

    images: {
      type: [String],
      required: true,
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
      required: true,
    },

    category: {
      type: String,
      enum: ["Furniture", "Appliance"],
      required: true,
    },

    subCategory: {
      type: String,
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
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
      default: 0.0,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    material: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    dimensions: {
      type: String,
      default: "",
    },

    brand: {
      type: String,
      default: "",
    },

    weight: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
