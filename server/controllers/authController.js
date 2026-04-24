import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import generateToken from "../utils/generateToken.js";
import userModel from "../models/user-model.js";
import userValidateSchema from "../validators/userValidator.js";

dotenv.config();
const registerUser = async (req, res) => {
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
                }
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });

                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.status(201).send("User registered successfully");
                }
            })
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

const loginUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send("No data received");
        }   

        const { email, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(500).send("Error occurred while comparing passwords");
            }
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.status(200).send("User logged in successfully");
            } else {
                return res.status(400).send("Invalid email or password");
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).send("User logged out successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

export { registerUser, loginUser, logoutUser };


