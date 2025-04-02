import mongoose, { Schema } from "mongoose";

const subMenuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true
    },
    // permissions: {
    //     add: { type: Boolean, default: false },
    //     edit: { type: Boolean, default: false },
    //     view: { type: Boolean, default: false },
    //     delete: { type: Boolean, default: false },
    // },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: false
    },
},{
    timestamps: true
});

export const SubMenu = mongoose.model("SubMenu", subMenuSchema)
