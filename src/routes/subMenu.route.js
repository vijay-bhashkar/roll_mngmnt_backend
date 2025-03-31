import { Router } from "express";
import { 
    createSubMenu, 
    getSubMenu
   
} from "../controllers/subMenu.controller.js";

import { verifyJWT, superAdminAuth } from "../middlewares/auth.middleware.js";


const router = Router()

// Super Admin Menu Route
router.route("/add-subMenu").post( verifyJWT, superAdminAuth, createSubMenu)
router.route("/get-subMenus").get( verifyJWT, superAdminAuth, getSubMenu)


export default router