const bd = require("../database/models");
const { Op } = require('sequelize');

module.exports = {


    buscador: async(req, res)=>{
      let nombre = req.params.nombre;
      let products = await bd.Producto.findAll({where: {nombre: {[Op.like]: `%${nombre}%`}}})
      return res.json(products)
    },


    obtenerProductos: async (req, res)=>{
        return res.status(200).json(await bd.Producto.findAll())
    },


    obtenerProductoID: async (req, res) => {
      try {
        const product = await bd.Producto.findByPk(req.params.id);
        if (!product) {
          return res.status(404).render("./404", { title: "404 Not Found", session: req.session.user });
        }
        return res.status(200).render(
          "./products/productDetail",
          {result: product, title: "Producto", session: req.session.user }
        );
      }catch (error){
        console.log(error);
      }
  },

    obtenerCategoria: async(req,res)=>{
        return res.status(200).json(await bd.Categoria.findAll())
    }
}