import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import generateToken from "../utils/generateToken.js";
import userModel from "../models/user-model.js";
import ownerModel from "../models/owner-model.js";
import userValidateSchema from "../validators/userValidator.js";
import ownerValidateSchema from "../validators/ownerValidator.js";

dotenv.config();
export const registerUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("No data received");
    }

    const { error } = userValidateSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).send("Error occurred while hashing password");
        } else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          res.status(201).send("User registered successfully");
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    const token = generateToken(user);
    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful",
      role: user.role,
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("User logged out successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingAdmin = await userModel.findOne({ role: "admin" });
    if (existingAdmin) {
      return res.status(403).send("Admin already exists");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const admin = await userModel.create({
      fullname,
      email,
      password: hash,
      role: "admin",
    });

    const token = generateToken(admin);
    res.cookie("token", token);

    res.status(201).send("Admin registered successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default { registerUser, loginUser, logoutUser, registerAdmin };