const express = require("express");
const path = require('path');
const router = express.Router();
const indexController = require("../controllers/indexController");
const productController = require("../controllers/productController");
const multer = require('multer');

//llama al middleware
const validator = require("../middleware/validation");
const midSession = require("../middleware/midSession");
const midCokie = require("../middleware/midcookies");

const directorioImg = path.join(__dirname, "../../public/img/product")


//configurando en donde se va a guardar los archivos
const storage = multer.diskStorage({
    //direccion en donde se guarda
    destination: (req, file, cb) =>{
        cb(null, directorioImg)
    },
    //nombre con el que se guarda el archivo
    filename: (req, file, cb) =>{
        const fileName = 'product' + Date.now() + path.extname(file.originalname)
        cb(null, fileName);
    }
});

const uploadFile = multer({storage});

router.get("/", midCokie, indexController.index);

router.get("/productCart", midCokie, midSession.hasSession, productController.productCart);

router.get("/productDetail/:idProduct", midCokie, productController.getProduct);

router.get("/createProduct", midCokie, midSession.hasSession, productController.createProduct);
router.post("/createProduct", uploadFile.single('imagenProducto'), productController.create);

router.get("/editProduct/:idProduct", midCokie, midSession.hasSession, productController.editProduct);
router.put("/editProduct/:idProduct",uploadFile.single('imagenProducto'), productController.modifyProduct);

router.get("/deleteProduct/:idProduct", midCokie, midSession.hasSession, productController.deleteProduct);
router.delete("/deleteProduct/:idProduct", productController.delete);

router.get("/listProducts", midCokie, midSession.hasSession, productController.listProduct);

module.exports = router;