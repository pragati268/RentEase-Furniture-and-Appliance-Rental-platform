import express from "express";
import cors from "cors";
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

import cookieParser from "cookie-parser";

import userModel from "./models/user-model.js";
import indexRouter from "./routes/indexRouter.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api", indexRouter); 



app.listen(3000);