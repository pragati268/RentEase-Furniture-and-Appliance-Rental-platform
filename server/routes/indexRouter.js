import express from "express";
const router = express.Router();

import authRouter from "./authRoutes.js";
import productRouter from "./productRoutes.js";


router.use("/auth", authRouter);
router.use("/products", productRouter);


export default router;