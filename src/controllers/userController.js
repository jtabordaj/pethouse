const path = require('path');
const fs = require('fs');
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
    login: (req, res) =>{
        res.render("./users/login", {title:"Login"});
    },

    loginForm: (req, res)=>{
        let email = req.body.email;
        let password = req.body.passwordLogin

        // Buscar el usuario
       
        let theUser = users.find(row => row.email == email && bcrypt.compareSync(password, row.password)
        == true);
        
        if (theUser == undefined){
            return res.send("La contraseña no coincide con el email o el usuario no existe")
        }

        else{
            return res.send("¡Ingresó con éxito!")
        }

        
    },

    register: (req, res) =>{
        res.render("./users/register", {title:"Registro"});
    },

    registerForm: (req, res)=>{
        const id =  users[users.length - 1].id + 1;

        const user = {
            id : id,
            img: req.file.filename,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: bcrypt.hashSync(req.body.password,10)
        };
        
        users.push(user);
        
        // Convertir formato JSON
        
        let usersJson = JSON.stringify(users, null, 2);
        
        // Escritura de JSON

        fs.writeFileSync(rutaUser, usersJson);

        res.redirect("/");

    }
}

module.exports = userController;
