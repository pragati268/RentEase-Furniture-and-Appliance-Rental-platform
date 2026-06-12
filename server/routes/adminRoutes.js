import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } from "../controllers/productController.js";
import {
  getDashboardStats,
  getAdminBookings,
  updateBookingStatus,
  getAdminUsers,
  deleteUser,
} from "../controllers/adminController.js";

router.use(isLoggedIn, isAdmin);

router.get("/stats", getDashboardStats);

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.get("/bookings", getAdminBookings);
router.patch("/bookings/:id", updateBookingStatus);

router.get("/users", getAdminUsers);
router.delete("/users/:id", deleteUser);

export default router;
