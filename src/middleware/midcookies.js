let bd = require("../database/models")


async function middlewareCookies(req, res, next) {


    //pregunta si hay una cookie email y si la session email este desactivada
    if (req.cookies.tmp && !req.session.user) {
        //busca el email en la base de datos para verificar que este
        let consultaBD = await bd.Usuario.findOne({where: {email: req.cookies.tmp}});
        //si esta se acctiva la session
        if (consultaBD) {
            req.session.user = {
                name: consultaBD.nombre_y_apellido,
                user: consultaBD.user,
                email: consultaBD.email,
                direccion: consultaBD.direccion,
                img: "./img/users/" + consultaBD.img
            };
        }
    }
    next();
}
module.exports = middlewareCookies;