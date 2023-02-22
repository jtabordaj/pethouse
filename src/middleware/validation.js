const {body} = require('express-validator');
const session = require('express-session');

module.exports = {

    validatorRegister: [
        body("name").notEmpty().trim().withMessage('Completa campo de Nombre'),
        body("user").notEmpty().withMessage('Completa campo de Usuario'),
        body("email").isEmail().normalizeEmail().withMessage('Ingrese un correo valido'),
        body("address").notEmpty().withMessage('Completa campo de dirección'),
        body("password").notEmpty().withMessage('Contraseña minima 8 caracteres').isLength({min:8}),
        body("password2").notEmpty().custom((value, {req}) =>{
            if(value != req.body.password){
                throw new Error('La contraseña no coincide');
            }else{
                return true;
            }
        })
    ],
    validatorLogin: [
        body("email").isEmail().normalizeEmail().withMessage('Ingrese un correo valido'),
        body("passwordLogin").notEmpty().withMessage('Contraseña minima 8 caracteres')
    ],
    session : (req,res,next) => {
        if(req.session.user){
            res.send('Iniciaste sesión')
        };
        next()
    }
}
