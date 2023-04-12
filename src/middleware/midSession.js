module.exports = {
    hasSession: (req, res, next)=>{
        if(!req.session.user) return res.redirect("/login");
        else{
            next();
        }
    }
}
