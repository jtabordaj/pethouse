const path = require('path');
const fs = require('fs');

//rutas para acceder a los archivos de la base de datos

const bd = require("../database/models")
const rutaProduct = path.join(__dirname, "../database/product.json");
const rutaCategory = path.join(__dirname, "../database/category.json");

//trae la informacion de la base de dato  y lo parsea
let product = JSON.parse(fs.readFileSync(rutaProduct));
let category = JSON.parse(fs.readFileSync(rutaCategory));

const productController = {
    //carrito
    productCart: (req, res) =>{
        res.render("./products/productCart", {
            title:"productCart",
            session: req.session.user
        });
    },
    //detalle del productt
    getProduct: async (req, res) => {
        let productId = req.params.idProduct;
        let result = product.find(p => p.id == productId);
        if (!result) {
            res.status(404).send("Producto no encontrado")
            return;
        } res.render("./products/productDetail", {result, title:"Producto", session: req.session.user});
    },
    
    //creacion de producto
    createProduct: async (req, res) =>{
        let marca = {};
        let categoria = {}
        try {
            categoria = await bd.Categoria.findAll();
            marca = await bd.Marca.findAll();
        } catch (error) {
            console.log(error);
        }
        res.render("./products/createProduct", {
            title:"Crear Producto",
            type:"crear",
            box: product[0], 
            category: categoria,
            marca: marca,
            actions: "/createProduct",
            session: req.session.user
           
        });
    },
    create: async (req, res) => {

        if(!req.file){
            return res.send("No se cargo ninguna imagen por favor regrese al formulario y carge una imagen")
        };
        
        //guardar producto en sql       
        try{
            // se busca id de la categoria seleccionada
            //const categoria = await bd.Categoria.findOne({where: {categoria: req.body.category}});
            
            //se busca id de la marca seleccionada
            //const marca = await bd.Marca.findOne({where: {nombre: req.body.marca}});
            
            await bd.Producto.create({
                id_marca: req.body.marca,
                nombre: req.body.nombre_producto,
                precio: req.body.precio,
                cantidad_descuento: req.body.descuento,
                img: req.file.filename,
                descripcion: req.body.descripcion,
                id_categoria: req.body.category
            })

        }catch(error){
            console.log(error);
            res.redirect("/");
        }
            
        
        
        res.redirect("/");
    },

    //edicion del producto
    editProduct: async (req, res) =>{

        const idProduct = req.params.idProduct;
       
        try {
            //se busca el producto por el numero de id
            let producto = await bd.Producto.findByPk(idProduct);
            
            if(producto){
                res.render("./products/produc", {
                    title:"editProduct",
                    type:"editar", 
                    box: producto.dataValues, 
                    category: await bd.Categoria.findAll(), 
                    marca: await bd.Marca.findAll(),
                    actions: "/editProduct/" + idProduct + "?_method=PUT",
                    session: req.session.user
                });
            }else{
                    res.send("Producto no encontrado")
                }    
        } catch (error) {
            console.log(error);
        }
        
        
    },
    modifyProduct: async (req, res) =>{
        const idProduct = req.params.idProduct;
        
        try {
            await bd.Producto.update({
                id_marca: req.body.marca,
                nombre: req.body.nombre,
                precio: req.body.precio,
                cantidad_descuento: req.body.cantidad_descuento,
                descripcion: req.body.descripcion,
                id_categoria: req.body.category
            },
            {
                where: { id: idProduct } 
            })

            if (req.file) await bd.Producto.update({ img: req.file.filename }, { where: {id: idProduct} })

        } catch (error) {
            console.log(error);
        }


        // const modify = product.find(m => m.id == idProduct);
        // if (req.body.nombre_producto) modify.nombre_producto = req.body.nombre_producto;
        // if (req.body.tipo_mascota)modify.tipo_mascota = req.body.tipo_mascota;
        // if (req.body.marca)modify.marca = req.body.marca;
        // if (req.body.descripcion) modify.descripcion = req.body.descripcion;
        // if (req.body.categoria) modify.categoria = req.body.categoria;
        // if (req.body.precio) modify.precio = req.body.precio;
        // if (req.body.descuento) modify.descuento = req.body.descuento;
        // if (req.file){
        //     fs.unlink(__dirname + '../../../public' + modify.img, (err) => {
        //         if (err) throw err;
        //         console.log("File deleted!");
        //     })
        //     modify.img = req.file.filename
        // }
        //fs.writeFileSync(rutaProduct, JSON.stringify(product, null, 2));
        res.redirect("/");
        
    },
    deleteProduct: async (req, res) =>{
        const idProduct = req.params.idProduct;
        
        const producto = await bd.Producto.findByPk(idProduct);
        
        if(producto){
            res.render("./products/deleteProduct", {
                product: producto.dataValues, 
                category: await bd.Categoria.findAll(), 
                marca: await bd.Marca.findAll(),
                title:"borrarProducto",
                session: req.session.user
            });
        }else{
                res.send("Producto no encontrado")
            }
    },
    delete: async (req, res) =>{
        const idProduct = req.params.idProduct;
        
        await bd.Producto.destroy({where: {id: idProduct}})
        
        // const prod = product.find(p => p.id == idProduct);
        // prod.borrado = true;
        // fs.writeFileSync(rutaProduct, JSON.stringify(product, null, 2));
        
        res.redirect("/");
    },
    listProduct: (req,res)=>{ 
        console.log("entró")
        res.render("./products/listProduct",{
            title:"Lista de productos",
            product: product.filter(p => p.id ),
        })
    }
}

module.exports = productController;
