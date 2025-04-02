import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Menu } from "../models/menu.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
   
const createMenu = asyncHandler(async (req, res) => {
    const {  name } = req.body;

    if (
        [ name].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
 
    const existingMenu = await Menu.findOne({ name });

    if (existingMenu){
        throw new ApiError(400, "Menu already exists")
    } 

    const newMenu = new Menu({  name, createdBy: req.user._id });
    await newMenu.save();

    return res.status(201).json(
        new ApiResponse(200, newMenu, "Menu registered Successfully")
    )
})


const getMenu = asyncHandler(async (req, res) => {
    const menus = await Menu.find();
    
    return res.status(201).json(
        new ApiResponse(200, menus, "Menu list")
    )
})

export {
    createMenu,
    getMenu,
}