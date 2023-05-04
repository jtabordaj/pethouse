const bd = require("../../../database/models");
module.exports = {
    obtenerUsuarios: async (req, res)=>{
        let data = {};
        try {
            data.status = 200;
            let usuarios = await bd.Usuario.findAll();
            data.users = usuarios.map(user => {
                return{
                    id: user.id,
                    nombre: user.nombre_y_apellido,
                    email: user.email,
                    detail: "/apis/user/" + user.id
                }
            });
            return res.json(data)
            
        } catch (error) {
            data.status = 403;
            data.msg = error.msg
            return res.json(data)
        }
    },

    obtenerUsuarioID: async (req, res) => {
        let data = {}
        try {
            let usuario = await bd.Usuario.findByPk(req.params.id);
            usuario = usuario.dataValues;
            data.status = 200; 
            usuario.password = undefined;
            usuario.id_rol = undefined;
            usuario.img = '/img/users/' + usuario.img
            data = {...usuario, ...data}
            return res.json(data)

        } catch (error) {
            data.status = 403;
            data.msg = error.msg
            return res.json(data)
        }
    },
}