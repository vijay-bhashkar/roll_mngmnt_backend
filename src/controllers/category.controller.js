import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";
import { Subcategory } from "../models/subCategory.model.js";

// Create Category
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name || !req.file) {
        throw new ApiError(400, "Name and Image are required")
    }

    const category = await Category.create({
        name,
        image: req.file.path
    });

    return res.status(200).json(
        new ApiResponse(200, category, "Category Created Successfully")
    )
});


const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().select("_id name image");

    return res.status(200).json(
        new ApiResponse(200, categories, "Category Fetched Successfully")
    )
});


const createSubcategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;

    if (!name || !category || !req.file) {
        throw new ApiError(400, "Name, Image, and Category are required" );
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
        throw new ApiError(400, "Category Not Found")
    }

    const subcategory = await Subcategory.create({ 
        name, 
        image: req.file.path,
        category 
    });

    return res.status(200).json(
        new ApiResponse(200, subcategory, "Sub Category Created Successfully")
    )
});


const getSubcategories = asyncHandler(async (req, res) => {
    const subcategories = await Subcategory.find()
        .populate("category", "_id name")
        .select("_id name image category");

    return res.status(200).json(
        new ApiResponse(200, subcategories, "Sub Category Fetched Successfully")
    )
});


export {
    createCategory,
    getCategories,
    createSubcategory,
    getSubcategories
}