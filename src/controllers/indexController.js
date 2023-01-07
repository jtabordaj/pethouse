

const base = require("../database/dataBasePr");

const product = base.product;
const category = base.category;

const indexController = {
    index: (req, res) =>{
        res.render("index", {product: product, category: category});
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