const router = require("express").Router();

//? desc create new Permission
//? POST /admin/permissions/add
// router.post("/add")

//? desc get Permissions list
//? GET /admin/permissions/list
// router.get("/list")

//? desc Update A Permission
//? PATCH /admin/permissions/update/:roleID
// router.patch("/update/:roleID")

//? desc Delete A Permission
//? POST /admin/permissions/remove/:roleID
// router.delete("/remove/:roleID")

module.exports = {
  PermissionAdminApiRoutes: router,
};
