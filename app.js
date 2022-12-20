const express = require("express");
const app = express();
app.use(express.static("public"));

app.listen(3000, ()=>{
    console.log("servidor activo en el puerto 3000");
});
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/home.html");
});
app.get("/productCart", (req, res)=>{
    res.sendFile(__dirname + "/views/productCart.html");
});
app.get("/productDetail", (req, res)=>{
    res.sendFile(__dirname + "/views/productDetail.html")
});