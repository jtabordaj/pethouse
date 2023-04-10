window.addEventListener('load', function() {
    let form = document.querySelector("form")
    console.log(form.querySelectorAll("input"));

    
    
    form.addEventListener("submit", (e)=>{
        let error = [];
        let nombre = form.querySelector("#nombre_producto")
        let edad = form.querySelector("#edad")
        let descripcion = form.querySelector("#descripcion")
        let precio = form.querySelector("#precio")
        let descuento = form.querySelector("#descuento")
        let imagen = form.querySelector("#imagenProducto")
    
        //validacion del nombre
        if (nombre.value.length <= 5 ) {
            nombre.style.border = "1px solid red"
            error.push("el nombre debe de contener al menos 5 caracteres")
        } else {
            nombre.style.border = "1px solid green"
        }
        //validacion de la edad
        if (edad.value.length < 2 ) {
            edad.style.border = "1px solid red"
            error.push("la edad debe de contener al menos 2 caracteres")
        } else {
            edad.style.border = "1px solid green"
        }

        //validacion de precio
        if (isNaN(precio.value) || precio.value == "") {
            
            precio.style.border = "1px solid red"
            error.push("el precio debe de contener al menos un numero")
        } else {
            precio.style.border = "1px solid green"
        }

        //validacion de la descripcion
        if (descripcion.value.length < 20 ) {
            descripcion.style.border = "1px solid red"
            error.push("La descripcion debe de contener al menos 20 caracteres")
        } else {
            descripcion.style.border = "1px solid green"
        }
        if (imagen.value != "") {

            if (imagen.value.toLowerCase().includes("jpg") || imagen.value.toLowerCase().includes("jpeg") || imagen.value.toLowerCase().includes("png") || imagen.value.toLowerCase().includes("gif") ) {
                console.log("entro al switch");
                imagen.style.border = "3px solid green"
            } else {
                imagen.style.border = "3px solid red"
                error.push("formato de imagen no reconocido")
            }
            
        }else{
            imagen.style.border = "3px solid red"
            error.push("formato de imagen no reconocido")
        }
        console.log(form.querySelector(".categoria"));
        
        
        
    if(error.length > 0){
        e.preventDefault();
        let ulError = document.querySelector(".error")
        ulError.innerHTML = ""
        for (let e in error){
            ulError.innerHTML += `<li> ${error[e]} </li>`
        }
    }
    })
});