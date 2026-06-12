import express from "express";
const router = express.Router();

import authRouter from "./authRoutes.js";
import productRouter from "./productRoutes.js";
import bookingRouter from "./bookingRoutes.js";
import wishlistRouter from "./wishlistRoutes.js";
import adminRouter from "./adminRoutes.js";


router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/bookings", bookingRouter);
router.use("/wishlist", wishlistRouter);
router.use("/admin", adminRouter);



export default router;