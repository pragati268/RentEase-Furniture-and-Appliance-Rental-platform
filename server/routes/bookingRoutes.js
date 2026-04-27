import express from "express";
import { createBooking, userBookings, cancelBooking, allBookings } from "../controllers/bookingController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/create", isLoggedIn, createBooking);
router.get("/my", isLoggedIn, userBookings);
router.put("/:id/cancel", isLoggedIn, cancelBooking);
router.get("/all", isLoggedIn, isAdmin, allBookings);
export default router;