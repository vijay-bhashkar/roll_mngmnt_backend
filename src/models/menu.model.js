import mongoose, { Schema } from "mongoose"

const menuSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    roleId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Role", 
        required: false 
    },
}, {
    timestamps: true
});

export const Menu = mongoose.model("Menu", menuSchema)
