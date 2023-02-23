module.exports = {
    logIn: (req, res, next) =>{
        //verifica si tiene una session activa
        if (req.session.user) return res.redirect("/")
        else{
            next();
        }
    },
    logOut: (req, res, next)=>{
        if(!req.session.user) return res.redirect("/login");
        else{
            next();
        }
    }
    
}