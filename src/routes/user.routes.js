import { Router } from "express";
import { 
    registerUser, 
    loginUser,
    registerAdmin,
    getAdmin

} from "../controllers/user.controller.js";
import { assignPermission, getPermissions, getAllPermissions } from "../controllers/permission.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT, superAdminAuth } from "../middlewares/auth.middleware.js";


const router = Router()

// Super Admin Auth Route
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// Add Admin Route
router.route("/admin/register").post( verifyJWT, superAdminAuth, registerAdmin);
router.route("/admin/getAdmin").get(verifyJWT, superAdminAuth, getAdmin);

// Assign permission
router.route("/assign-permission").post(verifyJWT, superAdminAuth, assignPermission)
router.route("/all-permission").get(verifyJWT, superAdminAuth, getAllPermissions)
router.route("/permission/:roleId").get(verifyJWT, superAdminAuth, getPermissions)

export default router