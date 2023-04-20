const bd = require("../database/models");

module.exports = {
    obtenerProductos: async (req, res)=>{
        return res.json(await bd.Producto.findAll())
    },

    obtenerCategoria: async(req,res)=>{
        return res.json(await bd.Categoria.findAll())
    }
}