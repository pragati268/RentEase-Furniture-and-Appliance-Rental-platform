import express from "express";
const router = express.Router();

import { loginUser, registerUser , registerAdmin, logoutUser} from "../controllers/authController.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginUser);

export default router;