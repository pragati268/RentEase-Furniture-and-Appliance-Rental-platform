import express from "express";
const app = express();
import cookieParser from "cookie-parser";

import userModel from "./models/user-model.js";
import indexRouter from "./routes/indexRouter.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api", indexRouter); 



app.listen(3000);