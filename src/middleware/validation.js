const {body} = require('express-validator');
module.exports = {
    validatorRegister: [
        body('name').notEmpty().trim().withMessage('Completa campo de Nombre'),
        body('user').notEmpty().withMessage('Completa campo de Usuario'),
        body('email').isEmail().normalizeEmail().withMessage('ingrese un correo valido'),
        body('address').notEmpty().withMessage('Completa campo de direccion'),
        body('password').notEmpty().isLength([8]).withMessage('contraseña minima 8 caracteres'),
        body('password2').notEmpty().custom((value, {req}) =>{
            if(value != req.body.password){
                throw new Error('la contraseña no coincide');
            }else{
                return true;
            }
        })
    ]
}