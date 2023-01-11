const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.index);
router.get("/login", indexController.login);
router.get("/register", indexController.register);
router.get("/productCart", indexController.productCart);
router.get("/productDetail", indexController.productDetail);
router.get("/createProduct", indexController.createProduct);
router.get("/editProduct/:idProduct", indexController.editProduct);
router.put("/editProduct/:idProduct", indexController.modifyProduct);

module.exports = router;