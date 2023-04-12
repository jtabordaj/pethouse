const express = require("express");
const path = require('path');
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require('multer');

//llama al middleware
const validator = require("../middleware/validation");
const midSession = require("../middleware/midSession");

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

router.get("/editProfile", midSession.hasSession, userController.editProfile)
router.post("/editProfile",uploadFile.single('img'), validator.validatorRegister, userController.saveProfile)

router.get("/logOut", userController.logOut)

router.get("/login", userController.login);
router.post("/login", validator.validatorLogin, userController.loginForm);

router.get("/register", userController.register);
router.post("/register", uploadFile.single('img'), validator.validatorRegister, userController.registerForm);

router.get("/profile", midSession.hasSession, userController.showProfile)

module.exports = router