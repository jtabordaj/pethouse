const express = require("express");
const router = express.Router();
const controller = require("../controllers/apisController")

router.get("/apis/product", controller.obtenerProductos);

router.get("/apis/categoria",controller.obtenerCategoria);

module.exports = router;

