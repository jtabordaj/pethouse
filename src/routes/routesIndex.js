const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const productController = require("../controllers/productController");

router.get("/", indexController.index);
router.get("/login", indexController.login);
router.get("/register", indexController.register);
router.get("/productCart", productController.productCart);
router.get("/productDetail", productController.productDetail);
router.get("/createProduct", productController.createProduct);
router.post("/createProduct", productController.create);
router.get("/editProduct/:idProduct", productController.editProduct);
router.put("/editProduct/:idProduct", productController.modifyProduct);

module.exports = router;