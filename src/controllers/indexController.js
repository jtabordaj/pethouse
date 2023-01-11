

const base = require("../database/dataBasePr");
const path = require("path")
const product = base.product;
const category = base.category;
// const users = path.join(__dirname, "../views/users/index.ejs")

const indexController = {
    index: (req, res) =>{
        res.render("./users/index", {product: product, category: category});
    },
    login: (req, res) =>{
        res.render("login");
    },
    register: (req, res) =>{
        res.render("register");
    },
    productCart: (req, res) =>{
        res.render("productCart");
    },
    productDetail: (req, res) =>{
        res.render("productDetail");
    },
};
module.exports = indexController;