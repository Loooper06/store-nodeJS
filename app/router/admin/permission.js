const {
  PermissionController,
} = require("../../http/controllers/admin/RBAC/permissionController");

const router = require("express").Router();

//? desc create new Permission
//? POST /admin/permissions/add
router.post("/add", PermissionController.createNewPermission);

//? desc get Permissions list
//? GET /admin/permissions/list
router.get("/list", PermissionController.getAllPermissions);

//? desc Update A Permission
//? PATCH /admin/permissions/update/:roleID
router.patch("/update/:permissionID", PermissionController.updatePermission);

//? desc Delete A Permission
//? POST /admin/permissions/remove/:roleID
router.delete("/remove/:permissionID", PermissionController.removePermission);

module.exports = {
  PermissionAdminApiRoutes: router,
};
