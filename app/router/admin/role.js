const router = require("express").Router();

//? desc create new Role
//? POST /admin/roles/add
// router.post("/add")

//? desc get Roles list
//? GET /admin/roles/list
// router.get("/list")

//? desc Update A Role
//? PATCH /admin/roles/update/:roleID
// router.patch("/update/:roleID")

//? desc Delete A Role
//? POST /admin/roles/remove/:roleID
// router.delete("/remove/:roleID")

module.exports = {
  RoleAdminApiRoutes: router,
};
