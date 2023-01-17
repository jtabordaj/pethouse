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
            img: "/img/product/" + req.file.filename,    
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
        const routImg = modify.img;

        if (req.body.name_product) modify.nombre_producto = req.body.name_product;
        if (req.body.mascota) modify.tipo_mascota = req.body.mascota;
        if (req.body.marca) modify.marca = req.body.marca;
        if (req.body.descripcion) modify.descripcion = req.body.descripcion;
        if (req.body.articulo) modify.categoria = req.body.articulo;
        if (req.body.precio) modify.precio = req.body.precio;
        if (req.body.descuento) modify.descuento = req.body.descuento;
        if (req.file) {
            fs.unlink(routImg, (err) => {
                if (err) throw err;
                console.log("File deleted!");
            })
            modify.img = "/img/product/" + req.file.filename
        }
    
        fs.writeFileSync(rutaProduct, JSON.stringify(product, null, 2));
        res.send(modify);
    },
    deleteProduct: (req, res) =>{
        const idProduct = req.params.idProduct;
        const producto = product.find( p => p.id == idProduct)
        
        if(producto){
            res.render("./products/deleteProduct", {pro:producto, title:"borrarProduct"});
        }else{
                res.send("Producto no encontrado")
            }
    },
    delete: (req, res) =>{
        const idProduct = req.params.idProduct;
        const prod = product.find(p => p.id == idProduct);
        const rutaImg = path.join(__dirname, "../../public",prod.img);
        const productoEliminado = product.filter( p => p.id != idProduct);
        fs.unlink(rutaImg, (err) => {
            if (err) throw err;
            console.log("File deleted!");
        });
        fs.writeFileSync(rutaProduct, JSON.stringify(productoEliminado, null, 2));
        res.redirect("/");
    }
}

module.exports = productController;
