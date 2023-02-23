const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')


//rutas para acceder a los archivos de la base de datos
const rutaProduct = path.join(__dirname, "../database/product.json");
const rutaCategory = path.join(__dirname, "../database/category.json");
const rutaUser = path.join(__dirname, "../database/user.json");

//trae la informacion de la base de dato  y lo parsea
let product = JSON.parse(fs.readFileSync(rutaProduct));
let category = JSON.parse(fs.readFileSync(rutaCategory));
let users = JSON.parse(fs.readFileSync(rutaUser));

const userController = {
    logOut: (req, res)=>{
        req.session.destroy();
        res.redirect("/");
    },

    login: (req, res) =>{
        res.render("./users/login", {title:"Login"});
    },
    loginForm: (req, res)=>{
        let resultLogin = validationResult(req);
        if(resultLogin.errors.length > 0){ 
            return res.render("./users/login", {title:"Login", error: resultLogin.mapped(), datosUsuario: req.body})
        }
        let email = req.body.email;
        // Buscar el usuario   
        let theUser = users.find(row => row.email == email && !bcrypt.compareSync(req.body.passwordLogin, row.password));
        if(theUser == undefined){
            return res.render("./users/login", {title:"Login", userPassword: "Contraseña o email incorrectos", datosUsuario: req.body})
        }
        else{
            req.session.user = { 
                name: theUser.name,
                email: theUser.email,
                address: theUser.address,
                img: "./img/users/" + theUser.img
            }
            return res.redirect("/")
        }
    },
    register: (req, res) =>{
        res.render("./users/register", {title:"Registro"});
    },
    registerForm: (req, res)=>{
        let result = validationResult(req);

        if(result.errors.length > 0){
            
            return res.render("./users/register", {title:"Registro", error: result.mapped(), datosUsuario: req.body})
        }

        const id =  users[users.length - 1].id + 1;
        console.log(req.file.filename);
        const user = {
            id : id,
            img: req.file.filename,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: bcrypt.hashSync(req.body.password, 10)
        };
        
        users.push(user);
        
        // Convertir formato JSON
        
        let usersJson = JSON.stringify(users, null, 2);
        
        // Escritura de JSON

        fs.writeFileSync(rutaUser, usersJson);

        res.redirect("/");

    }
    
};

module.exports = userController;
