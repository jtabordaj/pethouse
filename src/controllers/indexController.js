
const product = [
    {
        id: 1,
        tipo_mascota: "perro",
        marca: "Pedigree",
        edad: "adulto",
        categoria: "alimento",
        precio: 89250,
        descuento: 15,
        img: "/img/pedigree-adulto.png",
    },
    {
        id: 2,
        tipo_mascota: "gato",
        marca: "Proplan",
        edad: "adulto",
        categoria: "comida",
        precio: 69270,
        descuento: 10,
        img: "/img/proplan-esterilizado.png",
    },
    {
        id: 3,
        tipo_mascota: "perro",
        marca: "Proplan",
        edad: "adulto",
        categoria: "comida",
        precio: 69255,
        descuento: 19,
        img: "/img/proplan-perro-adulto.png"
    },
];

const category = [
    {
        categoria: "alimento",
        titulo: "Alimentos",
        img: "/img/categoria_alimento-min.png",
    },
    {
        categoria: "snacks",
        titulo: "Snacks",
        img: "/img/categoria_snacks-min.png",
    },
]

const indexController = {
    index: (req, res) =>{
        res.render("index", {product: product, category: category});
    },
    login: (req, res) =>{
        res.render("login");
    },
    register: (req, res) =>{
        res.render("register");
    },
    productCart: (req, res) =>{
        res.render("productCart");
    },
    productDetail: (req, res) =>{
        res.render("productDetail");
    },
};
module.exports = indexController;