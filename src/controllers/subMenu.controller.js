import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Menu } from "../models/menu.model.js"
import { SubMenu } from "../models/submenu.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
   
const createSubMenu = asyncHandler(async (req, res) => {
    const { menuId, name } = req.body;

    if (
        [ menuId, name].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
 
    const existingmenu = await Menu.findById( menuId );
    if (!existingmenu) return res.status(404).json({ message: "Menu not found" });

    const newSubmenu = new SubMenu({
      name,
      menu: menuId,
      createdBy: req.user._id,
    });

    await newSubmenu.save();

    return res.status(201).json(
        new ApiResponse(200, newSubmenu, "Sub Menu registered Successfully")
    )
})


const getSubMenu = asyncHandler(async (req, res) => {
    const submenus = await SubMenu.find().populate("menu");
    
    return res.status(200).json(
        new ApiResponse(200, submenus, "Sub Menu list")
    )
})

export {
    createSubMenu,
    getSubMenu,
}