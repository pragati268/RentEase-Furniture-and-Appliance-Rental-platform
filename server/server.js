import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "http://localhost:5173"
  ],
  credentials: true,
}));


import cookieParser from "cookie-parser";

import userModel from "./models/user-model.js";
import indexRouter from "./routes/indexRouter.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api", indexRouter); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});