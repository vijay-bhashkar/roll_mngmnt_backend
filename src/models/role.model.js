import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
});

export const Role = mongoose.model("Role", roleSchema)
