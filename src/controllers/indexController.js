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
    createProduct: (req, res) =>{
        res.render("./products/createProduct");
    },
    editProduct: (req, res) =>{
        const idProduct = req.params.idProduct;
        const producto = product.find( p => p.id == idProduct)
        
        if(producto){
            res.render("./products/editProduct", {pro:producto});
        }else{
            res.send("Producto no encontrado")
        }
    },
    modifyProduct: (req, res) =>{
        const idProduct = req.params.idProduct;
        const modify = product.find(m => m.id == idProduct);

        modify.nombre_producto = req.body.name_product;
        modify.tipo_mascota = req.body.mascota;
        modify.marca = req.body.marca;
        modify.descripcion = req.body.descripcion;
        modify.categoria = req.body.articulo;
        modify.precio = req.body.precio;
        modify.img = req.body.imagenProducto
    
        res.send(modify);
        
    }
};
module.exports = indexController;