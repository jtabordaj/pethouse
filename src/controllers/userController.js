const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const { type } = require('os');

const bd = require("../database/models")


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
    
    loginForm: async (req, res)=>{
        let resultLogin = validationResult(req);
        if(resultLogin.errors.length > 0){ 
            return res.render("./users/login", {title:"Login", error: resultLogin.mapped(), datosUsuario: req.body})
        }
        let email = req.body.email;
        // Buscar el usuario   
        let theUser = await bd.Usuario.findOne({
            where: {email: email}
        })
        if(theUser == undefined){
            return res.render("./users/login", {title:"Login", userPassword: "Contraseña o email incorrectos", datosUsuario: req.body})
        }
        else{
            req.session.user = { 
                name: theUser.nombre_y_apellido,
                user: theUser.user,
                email: theUser.email,
                direccion: theUser.direccion,
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
        bd.Usuario.create({
            nombre_y_apellido: req.body.name,
            user: req.body.user,
            email: req.body.email,
            direccion: req.body.address,
            password: bcrypt.hashSync(req.body.password, 10),
            img:  req.file.filename,
            id_rol: 1
        })
        //json
        // const id =  users[users.length - 1].id + 1;
        // console.log(req.file.filename);
        // const user = {
        //     id : id,
        //     img: req.file.filename,
        //     name: req.body.name,
        //     email: req.body.email,
        //     address: req.body.address,
        //     password: bcrypt.hashSync(req.body.password, 10)
        // };
        
        // users.push(user);
        
        // // Convertir formato JSON
        
        // let usersJson = JSON.stringify(users, null, 2);
        
        // // Escritura de JSON

        // fs.writeFileSync(rutaUser, usersJson);
        res.redirect("/");
    },

    showProfile: (req,res) => {
        res.render("./users/profile", {title: "Perfil", session: req.session.user})
    },

    editProfile: (req,res) => {
        let theEmail = req.session.user.email;
        let editUser = bd.Usuario.findOne({
            where: {email: theEmail}
        });
        if (editUser){
            return res.render("./users/register", { 
                title: "Perfil",
                datosUsuario: editUser,
                type: "edit"
            })
        }
    },

    saveProfile:(req, res) => {
        let result = validationResult(req);
        if(result.errors.length > 0){
            return res.render("./users/register", {
                title:"Registro", 
                error: result.mapped(), 
                datosUsuario: req.body,
                type: "edit"
            })
        }
        let email = req.session.user.email;
        //let editUser = users.find(user=>user.email== email);
        users.forEach(user =>{ 
            if(user.email == email){
                user.img = req.file.filename,
                user.name = req.body.name,
                user.email = req.body.email,
                user.address = req.body.address,
                user.password = bcrypt.hashSync(req.body.password, 10)
            }
        })
        let usersJson = JSON.stringify(users, null, 2);
        // Escritura de JSON
        fs.writeFileSync(rutaUser, usersJson);
    }
};

module.exports = userController;
