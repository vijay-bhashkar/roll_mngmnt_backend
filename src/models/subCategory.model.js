import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String, 
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category", 
            required: true
        }
    },
    { timestamps: true }
);

export const Subcategory = mongoose.model("Subcategory", subcategorySchema);
