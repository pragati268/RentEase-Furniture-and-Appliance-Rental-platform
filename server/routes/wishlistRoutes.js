import express from "express";
const router = express.Router();

import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

router.get("/", isLoggedIn, getWishlist);
router.post("/add/:id", isLoggedIn, addToWishlist);
router.delete("/remove/:id", isLoggedIn, removeFromWishlist);

export default router;