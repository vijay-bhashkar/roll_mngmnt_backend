import mongoose from "mongoose";
import { Menu } from "./menu.model.js";
import { SubMenu } from "./submenu.model.js";

const permissionSchema = new mongoose.Schema(
    {
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true
        },
        menus: [
            {
                menu: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Menu",
                    required: true
                },
                submenus: [
                    {
                        submenu: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "SubMenu"
                        },
                        permissions: {
                            type: [String], // Example: ["READ", "WRITE", "DELETE"]
                            enum: ["ADD", "EDIT", "DELETE", "VIEW"],
                            required: true
                        }
                    }
                ]
            }
        ]
    },
    { timestamps: true }
);

export const Permission = mongoose.model("Permission", permissionSchema);
