const path = require('path');
const fs = require('fs');

//rutas para acceder a los archivos de la base de datos
const rutaProduct = path.join(__dirname, "../database/product.json");
const rutaCategory = path.join(__dirname, "../database/category.json");

//trae la informacion de la base de dato  y lo parsea
let product = JSON.parse(fs.readFileSync(rutaProduct));
let category = JSON.parse(fs.readFileSync(rutaCategory));

const productController = {
    productCart: (req, res) =>{
        res.render("./products/productCart", {title:"productCart"});
    },
    productDetail: (req, res) =>{
        res.render("./products/productDetail", {title:"productDetail"});
    },
    createProduct: (req, res) =>{
        res.render("./products/createProduct", {title:"createProduct"});
    },
    create: (req, res) => {
        let id = product[product.length - 1].id + 1
        let newProduct = {
            id: id,
            nombre_producto: req.body.name_product,
            tipo_mascota: req.body.mascota,
            marca: req.body.marca,
            descripcion: req.body.descripcion,
            categoria: req.body.articulo,
            precio: req.body.precio,
            img: req.body.imagenProducto,    
        };
        product.push(newProduct);
        console.log(newProduct);
        fs.writeFileSync(rutaProduct, JSON.stringify(product, null, 2));
        res.render("./products/createProduct", {title:"createProduct"});
    },
    editProduct: (req, res) =>{
        const idProduct = req.params.idProduct;
        const producto = product.find( p => p.id == idProduct)
        
        if(producto){
            res.render("./products/editProduct", {pro:producto, title:"editProduct"});
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
    
        fs.writeFileSync(rutaProduct, JSON.stringify(product, null, 2));
        res.send(modify);
        
    }
}

module.exports = productController;
