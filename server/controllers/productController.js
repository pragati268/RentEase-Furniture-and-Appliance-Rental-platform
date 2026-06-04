import mongoose from "mongoose";

import productModel from "../models/product-model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      pricePerDay,
      pricePerMonth,
      securityDeposit,
      category,
      image,
      stock,
      city,
      numOfReviews,
      ratings,
    } = req.body;
    const product = await productModel.create({
      name,
      price,
      description,
      pricePerDay,
      pricePerMonth,
      securityDeposit,
      category,
      image,
      stock,
      city,
      numOfReviews,
      ratings,
    });
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    const products = await productModel.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await productModel.find({ featured: true });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getProductsBySubCategory = async (req, res) => {
  try {
    const { category, subCategory } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (subCategory && subCategory !== "All") {
      filter.subCategory = subCategory;
    }

    const products = await productModel.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send("Product deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
