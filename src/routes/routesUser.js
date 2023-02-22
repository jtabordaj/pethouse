const express = require("express");
const path = require('path');
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require('multer');


const directorioImg = path.join(__dirname, "../../public/img/users")


//configurando en donde se va a guardar los archivos
const storage = multer.diskStorage({
    //direccion en donde se guarda
    destination: (req, file, cb) =>{
        cb(null, directorioImg)
    },
    //nombre con el que se guarda el archivo
    filename: (req, file, cb) =>{
        const fileName = 'user' + Date.now() + path.extname(file.originalname)
        cb(null, fileName);
    }
});

const uploadFile = multer({storage});

router.get("/login", userController.login);
router.post("/login", userController.loginForm);
router.get("/register", userController.register);
router.post("/register", uploadFile.single('img'), userController.registerForm);

module.exports = router;