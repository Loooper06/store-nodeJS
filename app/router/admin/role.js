const {
  RoleController,
} = require("../../http/controllers/admin/RBAC/roleController");
const { stringToArray } = require("../../http/middlewares/stringToArray");

const router = require("express").Router();

//? desc create new Role
//? POST /admin/roles/add
router.post("/add", stringToArray("permissions"), RoleController.createNewRole);

//? desc get Roles list
//? GET /admin/roles/list
router.get("/list", RoleController.getAllRoles);

//? desc Update A Role
//? PATCH /admin/roles/update/:roleID
// router.patch("/update/:roleID")

//? desc Delete A Role
//? POST /admin/roles/remove/:roleID
router.delete("/remove/:field", RoleController.removeRole);

module.exports = {
  RoleAdminApiRoutes: router,
};
