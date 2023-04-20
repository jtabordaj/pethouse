const express = require("express");
const router = express.Router();
const controller = require("../controllers/apisController")

router.get("/apis/product", controller.obtenerProductos);

module.exports = router;