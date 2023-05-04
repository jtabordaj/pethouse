const path = require('path');
const fs = require('fs');

//rutas para acceder a los archivos de la base de datos

const bd = require("../database/models")

const modelsProduct = {
    nombre: "",
    precio: "",
    descuento: 0,
    descripcion: "",
    tipo_mascota: 0
}


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
        const idProduct = req.params.idProduct;
        try {
            const result = await bd.Producto.findOne({where:{id: idProduct}});
            res.render("./products/productDetail", {result: result, title:"Producto", session: req.session.user});
        } catch (error) {
            console.error(error);
            res.status(404).render("./404");
            return;
        }
    },
    //creacion de producto
    createProduct: async (req, res) =>{
        let marca = {};
        let categoria = {}
        let tipo_mascota = {}
        try {
            tipo_mascota = await bd.Tipo_mascota.findAll()
            categoria = await bd.Categoria.findAll();
            marca = await bd.Marca.findAll();
        } catch (error) {
            console.log(error);
        }
        res.render("./products/createProduct", {
            title:"Crear Producto",
            type:"crear",
            box: modelsProduct, 
            category: categoria,
            marca: marca,
            tipo_mascota: tipo_mascota,
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
            await bd.Producto.create({
                id_marca: req.body.marca,
                nombre: req.body.nombre,
                precio: req.body.precio,
                cantidad_descuento: req.body.descuento,
                img: req.file.filename,
                descripcion: req.body.descripcion,
                id_categoria: req.body.category,
                id_tipo_mascota: req.body.tipo_mascota
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
                res.render("./products/createProduct", {
                    title:"editProduct",
                    type:"editar", 
                    box: producto.dataValues,
                    tipo_mascota: await bd.Tipo_mascota.findAll(), 
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
    listProduct: async (req,res)=>{ 
        let data = req.query;
        let produc = {}
        console.log(data);
        if(data.length > 0)
        {
            if(data.animal){
                //pone la primera letra en mayuscula
                data.animal = data.animal[0].toUpperCase() + data.animal.substring(1)
                
                //busca los productos segun el tipo de animal
                produc = await bd.Producto.findAll({
                    include:[{
                        model: bd.Tipo_mascota,
                        as: "tipo_mascotas",
                        where: {tipo_mascota: data.animal}
                    },{
                        model: bd.Marca,
                        as: "marcas",
                    },{
                        model: bd.Categoria,
                        as: "categorias",
                    }
                ]
                })
                if (produc.length >= 1) {
                    return res.render("./products/listProduct",{
                        title:"Lista de productos",
                        product: produc,
                        session: req.session.user
                    })      
                }else{
                      return res.render("./products/listProduct", {
                        title:"Lista de productos",
                        error: "no se encontraron productos",
                        session: req.session.user
                      })  
                } 
            }else if(data.oferta){
                produc = await bd.Producto.findAll(
                    {
                        where:{cantidad_descuento: this.cantidad_descuento > 0},
                        include:[{
                            model: bd.Tipo_mascota,
                            as: "tipo_mascotas"
                        },{
                            model: bd.Marca,
                            as: "marcas",
                        },{
                            model: bd.Categoria,
                            as: "categorias",
                        }
                    ]
                    }
                );
                if (produc.length >= 1) {
                    return res.render("./products/listProduct",{
                        title:"Lista de productos",
                        product: produc,
                        session: req.session.user
                    })      
                }else{
                      return res.render("./products/listProduct", {
                        title:"Lista de productos",
                        error: "no se encontraron productos con descuentos",
                        session: req.session.user
                      })  
                }
    
            }

        }else{
            console.log("entro");
            produc = await bd.Producto.findAll({
                include:[{
                    model: bd.Tipo_mascota,
                    as: "tipo_mascotas",
                },{
                    model: bd.Marca,
                    as: "marcas",
                },{
                    model: bd.Categoria,
                    as: "categorias",
                }
            ]
            })
            console.log("entro");
            return res.render("./products/listProduct",{
                title:"Lista de productos",
                product: produc,
                session: req.session.user
            })

        }
        
    }
}

module.exports = productController;
