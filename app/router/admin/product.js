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
  uploadFile.single("image"),
  stringToArray("tags"),
  ProductController.addProduct
);

//? desc update products
//? PATCH /admin/products/:id
router.patch("/:id", ProductController.editProduct);

//? desc remove product
//? DELETE /admin/products/:id
router.delete("/:id", ProductController.removeProduct);

//? desc get all products
//? GET /admin/products/
router.get("/", ProductController.getAllProducts);

//? desc get a product by blog's ID
//? GET /admin/products/:id
router.get("/", ProductController.getOneProduct);

module.exports = {
  ProductAdminApiRoutes: router,
};
