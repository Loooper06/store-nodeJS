const {
  ProductController,
} = require("../../http/controllers/admin/productController");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

//? desc create new product
//? POST /admin/products/add
router.post(
  "/add",
  uploadFile.array("images", 10),
  stringToArray("tags"),
  ProductController.addProduct
);

//? desc update products
//? PATCH /admin/products/:id
router.patch("/update/:id", ProductController.editProduct);

//? desc remove product
//? DELETE /admin/products/:id
router.delete("/delete/:id", ProductController.removeProduct);

//? desc get all products
//? GET /admin/products/
router.get("/all", ProductController.getAllProducts);

//? desc get a product by blog's ID
//? GET /admin/products/:id
router.get("/:id", ProductController.getOneProduct);

module.exports = {
  ProductAdminApiRoutes: router,
};
