import express from "express";
import { createCategory, getCategories, createSubcategory, getSubcategories  } from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, superAdminAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Category route
router.route("/add-category").post(upload.single("image"), verifyJWT, superAdminAuth, createCategory); 
router.route("/get-categories").get(verifyJWT, superAdminAuth, getCategories); 


// Sub Category route
router.route("/add-subcategory").post(upload.single("image"), verifyJWT, superAdminAuth, createSubcategory); 
router.route("/get-subcategories").get(verifyJWT, superAdminAuth, getSubcategories); 

export default router;
