import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        image: {
            type: String, 
            required: true
        }
    },
    { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
