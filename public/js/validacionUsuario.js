window.addEventListener('load', function() {
    let error = [];
    let form = document.querySelector("form");
    let imagen = document.querySelector('#img');
    let nombre = form.querySelector('#name');
    let email = form.querySelector('#email');
    let clave = form.querySelector('#password');
    let clave2 = form.querySelector('#password2');


    nombre.addEventListener('blur', function(e){
        if(nombre.value.length >= 2){            
            nombre.style.border = '1px solid green'
        }else{
            nombre.style.border = '1px solid red'
            error.push("Ingresar un nombre con mínimo dos caracteres")
        }        
    } )

    email.addEventListener('blur', function(e){
        if(email.value.includes('@') && email.value.includes('.') ){
            email.style.border = '1px solid green'
        }else{
            email.style.border = '1px solid red'
            error.push("Ingresar un email válido")
        }
    })

    clave.addEventListener('blur', function(e){
        console.log(clave.value.length)
        if(clave.value.length >= 8){
            clave.style.border = '1px solid green'
        }else{
            clave.style.border = '1px solid red'
            error.push("Ingresar una clave con mínimo 8 caracteres")
        }
    })

    clave2.addEventListener('blur', function(e){
        if(clave2.value.length >= 8){
            clave2.style.border = '1px solid green'
        }else{
            clave2.style.border = '1px solid red'
        }
})

//en el momento que se hace submit
form.addEventListener("submit", (e)=>{

        if(nombre.value.length >= 2){            
            nombre.style.border = '1px solid green'
        }else{
            if(!error.includes("Ingresar un nombre con mínimo dos caracteres")){
                nombre.style.border = '1px solid red'
                error.push("Ingresar un nombre con mínimo dos caracteres")
             }
        }        

        if(email.value.includes('@') && email.value.includes('.') ){
            email.style.border = '1px solid green'
        }else{
            if(!error.includes("Ingresar un email válido")){
                nombre.style.border = '1px solid red'
                error.push("Ingresar un email válido")
             }
        
        }

        if(clave.value.length >= 8){
            clave.style.border = '1px solid green'
        }else{
            if (!error.includes("Ingresar una clave con mínimo 8 caracteres")) {
                clave.style.border = '1px solid red'
                error.push("Ingresar una clave con mínimo 8 caracteres")   
            }
        }

        if (imagen.value != "") {
            if (imagen.value.toLowerCase().includes("jpg") || imagen.value.toLowerCase().includes("jpeg") || imagen.value.toLowerCase().includes("png") || imagen.value.toLowerCase().includes("gif") ) {
                    imagen.style.border = "3px solid green"
            }else{
                if (error.includes("formato de imagen no reconocido")) {
                    imagen.style.border = "3px solid red"
                    error.push("formato de imagen no reconocido")   
                }
            }
        }else{
            imagen.style.border = "3px solid red"
            error.push("formato de imagen no reconocido")
        };

        if(clave.value != clave2.value && error.includes("La contraseña no coincide")){
            error.push("La contraseña no coincide")
        }

        if(error.length >= 1){
            e.preventDefault();
            let ulError = document.querySelector(".error")
            ulError.innerHTML = ""
            for (let e in error){
                ulError.innerHTML += `<li> ${error[e]} </li>`
            }
        }
        error = []
    })
});