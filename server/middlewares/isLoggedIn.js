import jwt from "jsonwebtoken";
import userModel from "../models/user-model.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("Not authorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findOne({ _id: decoded.id }).select("-password");
    req.user = user;

    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};