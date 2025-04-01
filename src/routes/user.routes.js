import { Router } from "express";
import { 
    registerUser, 
    loginUser,
    registerAdmin,
    getAdmin

} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT, superAdminAuth } from "../middlewares/auth.middleware.js";


const router = Router()

// Super Admin Auth Route
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// Add Admin Route
router.route("/admin/register").post( verifyJWT, superAdminAuth, registerAdmin);
router.route("/admin/getAdmin").get(verifyJWT, superAdminAuth, getAdmin);

export default router