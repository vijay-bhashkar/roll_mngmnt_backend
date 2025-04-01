import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Business } from "../models/business.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createbusiness = asyncHandler(async (req, res) => {
    const { name, category, subCategory, country, state, city, area, phoneNumber } = req.body

    if (!name || !category || !subCategory || !country || !state || !city || !area || !phoneNumber){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await Business.findOne({
        $or: [{ name }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with name already exists")
    }

    const business = await Business.create({
        name,
        category,
        subCategory,
        country,
        state,
        city,
        area,
        phoneNumber
    })

    return res.status(201).json(
        new ApiResponse(200, business, "Business registered Successfully")
    )
})


const getBusiness = asyncHandler(async (req, res) => {
    const businesses = await Business.find();

    return res.status(200).json(
        new ApiResponse(200, businesses, "Businesses Fetched Successfully")
    )
});

export {
    createbusiness,
    getBusiness
}