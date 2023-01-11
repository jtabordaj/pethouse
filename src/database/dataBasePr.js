const base = {
    product: [
        {
            id: 1,
            nombre_producto: "Razas",
            tipo_mascota: ["perro"],
            marca: "Pedigree",
            descripcion: "alimento",            
            categoria: "alimento",
            precio: 89250,
            img: "/img/pedigree-adulto.png",
        },
        {
            id: 2,
            nombre_producto: "razas",
            tipo_mascota: "gato",
            marca: "Proplan",
            descripcion: "alimento",
            categoria: "alimento",
            precio: 69270,
            img: "/img/proplan-esterilizado.png",
        },
        {
            id: 3,
            nombre_producto: "razas",
            tipo_mascota: "perro",
            marca: "Proplan",
            descripcion: "alimento",
            categoria: "comida",
            precio: 69255,
            img: "/img/proplan-perro-adulto.png"
        },
    ],
    category: [
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
    ],
};


module.exports = base;