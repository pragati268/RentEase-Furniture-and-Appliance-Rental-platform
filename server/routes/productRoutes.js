import express from "express";
const router = express.Router();

import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

router.post("/create",isLoggedIn, isAdmin, createProduct);
router.get("/", isLoggedIn, getAllProducts);
router.get("/:id", isLoggedIn, getProductById);
router.put("/update/:id", isLoggedIn, isAdmin, updateProduct);
router.delete("/delete/:id", isLoggedIn, isAdmin, deleteProduct);

export default router;


