import { Router } from "express";
import { 
    createRole, 
    getRole
   
} from "../controllers/role.controller.js";

import { verifyJWT, superAdminAuth } from "../middlewares/auth.middleware.js";


const router = Router()

// Super Admin Menu Route
router.route("/add-role").post( verifyJWT, superAdminAuth, createRole)
router.route("/get-role").get( verifyJWT, superAdminAuth, getRole)


export default router