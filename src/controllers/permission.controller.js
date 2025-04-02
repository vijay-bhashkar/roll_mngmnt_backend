import { asyncHandler } from "../utils/asyncHandler.js";
import { Permission } from "../models/permission.model.js";
import { Role } from "../models/role.model.js";
import { Menu } from "../models/menu.model.js";
import { SubMenu } from "../models/submenu.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const assignPermission = asyncHandler(async (req, res) => {
  const { role, menus } = req.body;

  if (!role || !menus || !Array.isArray(menus) || menus.length === 0) {
    return res
      .status(400)
      .json({ message: "Role and Menus array are required" });
  }

  const roleExists = await Role.findById(role);
  if (!roleExists) {
    return res.status(404).json({ message: "Role not found" });
  }

  const formattedMenus = [];

  for (const menuData of menus) {
    const { menu, submenus } = menuData;

    const menuExists = await Menu.findById(menu);
    if (!menuExists) {
      return res.status(404).json({ message: `Menu not found: ${menu}` });
    }

    const formattedSubmenus = [];

    if (submenus && Array.isArray(submenus)) {
      for (const submenuData of submenus) {
        const { submenu, permissions } = submenuData;

        const submenuExists = await SubMenu.findById(submenu);
        if (!submenuExists) {
          return res
            .status(404)
            .json({ message: `Submenu not found: ${submenu}` });
        }

        if (
          !permissions ||
          !Array.isArray(permissions) ||
          permissions.length === 0
        ) {
          return res
            .status(400)
            .json({ message: `Permissions required for submenu: ${submenu}` });
        }

        formattedSubmenus.push({ submenu, permissions });
      }
    }

    formattedMenus.push({ menu, submenus: formattedSubmenus });
  }

  const permission = await Permission.create({ role, menus: formattedMenus });

  return res
    .status(201)
    .json(new ApiResponse(200, permission, "Permission assigned Successfully"));
});

const getPermissions = asyncHandler(async (req, res) => {
  const { roleId } = req.params;

  if (!roleId) {
    return res.status(400).json({ message: "Role ID is required" });
  }

  const permissions = await Permission.find({ role: roleId })
    .populate({
      path: "menus.menu",
      select: "name",
    })
    .populate({
      path: "menus.submenus.submenu",
      select: "name",
    });

  if (!permissions.length) {
    return res
      .status(404)
      .json({ message: "No permissions found for this role" });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, permissions, "Permission fetched Successfully"));
});

const getAllPermissions = asyncHandler(async (req, res) => {
    const permissions = await Permission.find()
        .populate({
            path: "role",
            select: "name", 
        })
        .populate({
            path: "menus.menu",
            select: "name", 
        })
        .populate({
            path: "menus.submenus.submenu",
            select: "name",
        });

    if (!permissions.length) {
        return res.status(404).json({ message: "No assigned permissions found" });
    }

    return res
    .status(200)
    .json(new ApiResponse(200, permissions, "All Permission fetched Successfully"));
});

export { assignPermission, getPermissions, getAllPermissions };
