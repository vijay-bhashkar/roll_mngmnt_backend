import { Router } from "express";
import { 
    createMenu, 
    getMenu
   
} from "../controllers/menu.controller.js";

import { verifyJWT, superAdminAuth } from "../middlewares/auth.middleware.js";


const router = Router()

// Super Admin Menu Route
router.route("/add-menu").post( verifyJWT, superAdminAuth, createMenu)
router.route("/get-menus").get( verifyJWT, superAdminAuth, getMenu)


export default router