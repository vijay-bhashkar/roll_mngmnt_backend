import { Router } from "express";
import { 
  
    registerUser, 
    loginUser
   
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT, superAdminAuth } from "../middlewares/auth.middleware.js";


const router = Router()

// Super Admin Auth Route
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// Add Admin Route


export default router