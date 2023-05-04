const bd = require("../../../database/models");

module.exports = {
    obtenerProductos: async (req, res)=>{
      let data = {}  
      try {
          data.status = 200;
          let product = await bd.Producto.findAll({include:[{association:"categorias"}]});
          
          let category = await bd.Categoria.findAll({include:[{association:"productos"}]});
          data.count = product.length;
          data.countByCategory = {};

          category.forEach(element => {
            data.countByCategory[element.categoria] = element.productos.length
          });

          data.product = product.map(pr =>{
            return {
              id: pr.id,
              nombre: pr.nombre,
              descripcion: pr.descripcion,
              detail: "/apis/product/" + pr.id,
              categoria:  pr.categorias.categoria
            }
          })
          
          data = {...product.dataValue, ...data}
          data.img = "/img/product/" + data.img;
          return res.json(data)
        }catch (error){
          data.status = 403
          data.msg = error.msg
          return res.json(data)
        }
    },

    obtenerProductoID: async (req, res) => {
      let data = {}  
      try {
          data.status = 200;
          let product = await bd.Producto.findByPk(req.params.id, {include:[{association:"marcas"}, {association:"categorias"},{association:"tipo_mascotas"}]});
          product.dataValues.img = "/img/product/" + product.img
          data = {...product.dataValues, ...data}
          return res.json(data)
        }catch (error){
          data.status = 403
          data.msg = error.msg
          return res.json(data)
        }
    },
}