window.addEventListener('load', function() {
    let error = [];
    let form = document.querySelector("form");
    let imagen = document.querySelector('#img');
    let nombre = form.querySelector('#name');
    let usuario = form.querySelector('#user');
    let email = form.querySelector('#email');
    let direccion = form.querySelector('#address');
    let clave = form.querySelector('#password');
    let clave2 = form.querySelector('#password2');

    console.log(form.querySelectorAll("input"))

    nombre.addEventListener('blur', function(e){
        console.log(nombre.value.length)
        if(nombre.value.length >= 2){            
            nombre.style.border = '1px solid green'
        }
        else{
            nombre.style.border = '1px solid red'
            error.push("Ingresar un nombre con mínimo dos caracteres")
        }        
    } )

       
    email.addEventListener('blur', function(e){
        console.log(email.value.length)
        if(email.value.includes('@') && email.value.includes('.') ){
            email.style.border = '1px solid green'
        }

        else{
            email.style.border = '1px solid red'
            error.push("Ingresar un email válido")
        }
    })

    clave.addEventListener('blur', function(e){
        console.log(clave.value.length)
        if(clave.value.length >= 8){
            clave.style.border = '1px solid green'
        }
        else{
            clave.style.border = '1px solid red'
            error.push("Ingresar una clave con mínimo 8 caracteres")
        }
    })

    clave2.addEventListener('blur', function(e){
        console.log(clave2.value.length)
        if(clave2.value.length >= 8){
            clave2.style.border = '1px solid green'
        }
        else{
            clave2.style.border = '1px solid red'
        }
    })






    form.addEventListener("submit", (e)=>{



        if(nombre.value.length >= 2){            
            nombre.style.border = '1px solid green'
        }
        else{
            if(!error.includes("Ingresar un nombre con mínimo dos caracteres")){
                nombre.style.border = '1px solid red'
                error.push("Ingresar un nombre con mínimo dos caracteres")
             }
        }        


        if(email.value.includes('@') && email.value.includes('.') ){
            email.style.border = '1px solid green'
        }

        else{
            if(!error.includes("Ingresar un email válido")){
                nombre.style.border = '1px solid red'
                error.push("Ingresar un email válido")
             }
        
        }



        if(clave.value.length >= 8){
            clave.style.border = '1px solid green'
        }
        else{
            clave.style.border = '1px solid red'
            error.push("Ingresar una clave con mínimo 8 caracteres")
        }


        if (imagen.value != "") {

            if (imagen.value.toLowerCase().includes("jpg") || imagen.value.toLowerCase().includes("jpeg") || imagen.value.toLowerCase().includes("png") || imagen.value.toLowerCase().includes("gif") ) {
                    imagen.style.border = "3px solid green"
            } 
            
            else {
                imagen.style.border = "3px solid red"
                error.push("formato de imagen no reconocido")
            }
        }  

        else{
            imagen.style.border = "3px solid red"
            error.push("formato de imagen no reconocido")
        };

        if(clave.value != clave2.value){
            error.push("La contraseña no coincide")
        }

    
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