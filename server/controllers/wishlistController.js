import mongoose from "mongoose";
import userModel from "../models/user-model.js";
import productModel from "../models/product-model.js";

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId).populate("wishlist");

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user.wishlist);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({ message: "Product added to wishlist" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.wishlist.pull(productId);
    await user.save();  

    res.status(200).json({ message: "Product removed from wishlist" });
    } catch (err) { 
    console.log(err);
    res.status(500).send(err.message);
  } 
};

