const express = require("express");
const path = require('path');
const router = express.Router();
const indexController = require("../controllers/indexController");
const productController = require("../controllers/productController");
const multer = require('multer');

//llama al middleware
const validator = require("../middleware/validation");
const midSession = require("../middleware/midSession")

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

router.get("/", indexController.index);

router.get("/productCart", midSession.logIn, productController.productCart);

router.get("/productDetail/:idProduct", productController.getProduct);

router.get("/createProduct", midSession.logOut, productController.createProduct);
router.post("/createProduct", uploadFile.single('imagenProducto'), productController.create);

router.get("/editProduct/:idProduct", midSession.logOut, productController.editProduct);
router.put("/editProduct/:idProduct",uploadFile.single('imagenProducto'), productController.modifyProduct);

router.get("/deleteProduct/:idProduct", midSession.logOut, productController.deleteProduct);
router.delete("/deleteProduct/:idProduct", productController.delete);

router.get("/listProduct", midSession.logOut, productController.listProduct);

module.exports = router;