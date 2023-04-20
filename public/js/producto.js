window.addEventListener("load", async (e)=>{
    let nombre = document.querySelector("#nombre");
    let img = document.querySelector("#imagen");
    let precio = document.querySelector("#precio");
    let descripcion = document.querySelector("#desc");

    let searchParams = new URLSearchParams(location.search);
    let productId = searchParams.get("productId");

    let product = await fetch(`http://localhost:3000/apis/products`).then(res =>{
        return res.json();
    }).then(data => {
        let filteredProduct = data.filter(item => item.id === productId);
        return filteredProduct;
    })
    .catch(error => {
        console.error(error);
    });

    // set innerHTML 
    nombre.innerHTML = product[0].nombre;
    img.src = product[0].imagen;
    precio.innerHTML = product[0].precio;
    descripcion.innerHTML = product[0].descripcion;
})