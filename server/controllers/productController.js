import mongoose from "mongoose";

import productModel from "../models/product-model.js";

export const createProduct = async (req, res) => {
  try {
    const {name, price, pricePerDay, pricePerMonth, securityDeposit, category} = req.body;
    const product = await productModel.create({
        name,
        price,
        pricePerDay,
        pricePerMonth,
        securityDeposit,
        category,
    });    
    res.status(201).json(product);
  }
    catch (err) {   
    console.log(err);
    res.status(500).send(err.message);
  } 
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
    } catch (err) { 
    console.log(err);
    res.status(500).send(err.message);
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

export const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

