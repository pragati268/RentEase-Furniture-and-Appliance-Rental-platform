import express from "express";
const router = express.Router();

import { createProduct, getAllProducts, getProductById, getFeaturedProducts, getProductsBySubCategory ,updateProduct, deleteProduct } from "../controllers/productController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

router.post("/create", createProduct);
router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/subCategory", getProductsBySubCategory);
router.get("/:id", getProductById);
router.put("/update/:id", isLoggedIn, isAdmin, updateProduct);
router.delete("/delete/:id", isLoggedIn, isAdmin, deleteProduct);

export default router;


