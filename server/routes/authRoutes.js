import express from "express";
const router = express.Router();

import { loginUser, registerUser , registerAdmin, logoutUser, getMe } from "../controllers/authController.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginUser);
router.get("/me", isLoggedIn, getMe);

export default router;