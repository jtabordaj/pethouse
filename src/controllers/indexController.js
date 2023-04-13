const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");


//rutas para acceder a los archivos de la base de datos
const rutaProduct = path.join(__dirname, "../database/product.json");
const rutaCategory = path.join(__dirname, "../database/category.json");
const rutaUser = path.join(__dirname, "../database/user.json");

//trae la informacion de la base de dato  y lo parsea
let product = JSON.parse(fs.readFileSync(rutaProduct));
let category = JSON.parse(fs.readFileSync(rutaCategory));
let users = JSON.parse(fs.readFileSync(rutaUser));


const indexController = {
   
    index: (req, res) =>{
        const producShow = product.filter( p => !p.borrado && p.id);
        res.render("./users/index", {
            product: producShow, 
            category: category.filter( c => c.categoria == "categoria"), 
            title:"Pet House",
            session: req.session.user
        });
    }};
module.exports = indexController;