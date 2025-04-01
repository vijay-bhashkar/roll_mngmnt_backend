import { Router } from "express";
import { 
    createbusiness, 
    getBusiness
   
} from "../controllers/business.controller.js";

import { verifyJWT, superAdminAuth } from "../middlewares/auth.middleware.js";


const router = Router()

// Super Admin Business Route
router.route("/add-business").post( verifyJWT, superAdminAuth, createbusiness)
router.route("/get-business").get( verifyJWT, superAdminAuth, getBusiness)


export default router