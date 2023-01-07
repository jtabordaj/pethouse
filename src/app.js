const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/routesIndex")

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use("/", router)

app.listen(3000, ()=>{
    console.log("servidor activo en el puerto 3000");
});
