

const base = require("../database/dataBasePr");

const product = base.product;
const category = base.category;

const indexController = {
    index: (req, res) =>{
        res.render("./users/index", {product: product, category: category});
    },
    login: (req, res) =>{
        res.render("./users/login");
    },
    register: (req, res) =>{
        res.render("./users/register");
    },
    productCart: (req, res) =>{
        res.render("./products/productCart");
    },
    productDetail: (req, res) =>{
        res.render("./products/productDetail");
    },
};
module.exports = indexController;