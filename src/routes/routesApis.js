const express = require("express");
const router = express.Router();
const controller = require("../controllers/apisController")
const appiUsuario = require("../controllers/apis/usuarios/usuarioController")
const appiProducto = require("../controllers/apis/productos/productoController")

router.get("/apis/users", appiUsuario.obtenerUsuarios);
router.get("/apis/user/:id", appiUsuario.obtenerUsuarioID);

router.get("/apis/products", appiProducto.obtenerProductos);
router.get("/apis/product/:id", appiProducto.obtenerProductoID);

router.get("/apis/buscador/:nombre", controller.buscador);


router.get("/apis/product", controller.obtenerProductos);

router.get("/apis/categoria",controller.obtenerCategoria);

router.get("/apis/product/:idProduct",controller.obtenerProductoID);

module.exports = router;

