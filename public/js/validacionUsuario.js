window.addEventListener('load', function() {
    let form = document.querySelector("form")
    console.log(form.querySelectorAll('input'));
    let nombre = form.querySelector('#name');
    let usuario = form.querySelector('#user');
    let email = form.querySelector('#email');
    let direccion = form.querySelector('#address');
    let clave = form.querySelector('#password');
    let clave2 = form.querySelector('#password2');

    nombre.addEventListener('blur', function(e){
        console.log(nombre.value.length)
        if(nombre.value.length > 2){
            nombre.style.border = '1px solid green'
        }
        else{
            nombre.style.border = '1px solid red'
        }
        
    } )

    email.addEventListener('blur', function(e){
        console.log(email.value.length)
        if(email.value.includes('@') && email.value.includes('.') ){
            email.style.border = '1px solid green'
        }
        else{
            email.style.border = '1px solid red'
        }
    })







    form.addEventListener("submit", (e)=>{
    //     let error = [];
    //     e.preventDefault();
    //     let nombre = form.querySelector("#nombre_producto")
    //     let edad = form.querySelector("#edad")
    //     let descripcion = form.querySelector("#descripcion")
    //     let precio = form.querySelector("#precio")
    //     let descuento = form.querySelector("#descuento")
    //     let imagen = form.querySelector("#imagenProducto")
    
        
    //     if (nombre.value.length < 5 ) {
    //         console.log("entro");
    //         nombre.style.border = "1px solid red"
    //         error.push("el nombre debe de contener al menos 5 caracteres")
    //     } else {
    //         nombre.style.border = "1px solid green"
    //     }


    //     if (descripcion.value.length < 20 ) {
    //         descripcion.style.border = "1px solid red"
    //         error.push("La descripcion debe de contener al menos 20 caracteres")
    //     } else {
    //         descripcion.style.border = "1px solid green"
    //     }
    //     if (descripcion.value.length < 20 ) {
    //         descripcion.style.border = "1px solid red"
    //         error.push("La descripcion debe de contener al menos 20 caracteres")
    //     } else {
    //         descripcion.style.border = "1px solid green"
    //     }
        
    //     if (imagen.value != "") {

    //         if (imagen.value.toLowerCase().includes("jpg") || imagen.value.toLowerCase().includes("jpeg") || imagen.value.toLowerCase().includes("png") || imagen.value.toLowerCase().includes("gif") ) {
    //             console.log("entro al switch");
    //             imagen.style.border = "3px solid green"
    //         } else {
    //             imagen.style.border = "3px solid red"
    //             error.push("formato de imagen no reconocido")
    //         }
            
    //     }else{
    //         imagen.style.border = "3px solid red"
    //         error.push("formato de imagen no reconocido")
    //     }
        
        
        
        
    // console.log(imagen.value);
    })
});