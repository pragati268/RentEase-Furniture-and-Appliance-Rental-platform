import express from "express";
const router = express.Router();

import authRouter from "./authRoutes.js";
import productRouter from "./productRoutes.js";
import bookingRouter from "./bookingRoutes.js";


router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/bookings", bookingRouter);


export default router;