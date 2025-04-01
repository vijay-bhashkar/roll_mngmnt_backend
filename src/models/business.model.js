import mongoose, { Schema } from "mongoose";

const businessSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    category: {
        type: String,
        required: true,
        trim: true, 
    },
    subCategory: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
})

export const Business = mongoose.model("Business", businessSchema);