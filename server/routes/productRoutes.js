import express from "express";
const router = express.Router();

import { createProduct, getAllProducts, getProductById, getFeaturedProducts, getProductsBySubCategory ,updateProduct, deleteProduct , deleteAllProducts} from "../controllers/productController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

router.post("/create",isLoggedIn, isAdmin, createProduct);
router.get("/", isLoggedIn, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/subCategory", getProductsBySubCategory);
router.get("/:id", getProductById);
router.put("/update/:id", isLoggedIn, isAdmin, updateProduct);
router.delete("/delete/:id", isLoggedIn, isAdmin, deleteProduct);
router.delete("/deleteAll", isLoggedIn, isAdmin, deleteAllProducts);

export default router;


