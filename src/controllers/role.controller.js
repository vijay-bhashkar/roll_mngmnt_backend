import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Role } from "../models/role.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
   
const createRole = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if ( !name ) {
        throw new ApiError(400, "Name is required")
    }
 
    const existingRole  = await Role.findOne({ name });

    if (existingRole ){
        throw new ApiError(400, "Role already exists")
    } 

    const role = new Role({ name, createdBy: req.user._id });
    await role.save();

    return res.status(201).json(
        new ApiResponse(200, role, "Role registered Successfully")
    )
})


const getRole = asyncHandler(async (req, res) => {
    const roles = await Role.find();
    
    return res.status(201).json(
        new ApiResponse(200, roles, "Role list")
    )
})

export {
    createRole,
    getRole,
}