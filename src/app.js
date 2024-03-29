const express = require("express");
const path = require("path");
const router = require("./routes/routesIndex")
const routerUser = require("./routes/routesUser")
//const routerProduct = require("./routes/routesProduct")
const methodOverride = require("method-override");
const session = require('express-session');
const routerApis = require("./routes/routesApis")

const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
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
app.use("/", routerUser);
app.use("/", routerApis);
app.use((req,res,next) => {
    res.status(404).render('./404.ejs')
});

