const {
  CategoryController,
} = require("../../http/controllers/admin/category/categoryController");

const router = require("express").Router();

//? desc Add new Category
//? POST /admin/category/add
router.post("/add", CategoryController.addCategory);

//? desc get category parent list
//? GET /admin/category/parents
router.get("/parents", CategoryController.getAllParents);

//? desc get category childs of parent list
//? GET /admin/category/children/:parent
router.get("/children/:parent", CategoryController.getChildOfParents);

//? desc get all category list
//? GET /admin/category/all
router.get("/all", CategoryController.getAllCategory);

//? desc get all category list without nested structure
//? GET /admin/category/list-of-all
router.get("/list-of-all", CategoryController.getAllCategoryWithoutPopulate);

//? desc get category list By id
//? GET /admin/category/:id
router.get("/:id", CategoryController.getCategoryByID);

//? desc remove category
//? DELETE /admin/category/delete/:id
router.delete("/delete/:id", CategoryController.removeCategory);

//? desc edit category
//? DELETE /admin/category/edit/:id
router.patch("/edit/:id", CategoryController.editCategory);

module.exports = {
  CategoryAdminApiRoutes: router,
};
