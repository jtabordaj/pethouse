const express = require("express");
const path = require("path");
const router = require("./routes/routesIndex")
//const routerProduct = require("./routes/routesProduct")
const methodOverride = require("method-override");
const session = require('express-session');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(session({
    secret : 'petH',
    resave :true,
    saveUninitialized: true
}));

app.listen(3000, ()=>{
    console.log("servidor activo en el puerto 3000");
});

app.use("/", router);
// app.use("/product", routerProduct)

app.use((req,res,next) => {
    res.status(404).render('./404.ejs')
});
