window.addEventListener('load', function() {
    let form = document.querySelector("form")
    console.log(form.querySelectorAll("input"));

    let error = [];
    let email = document.querySelector("#userLogin");
    let clave = document.querySelector("#passwordLogin");



email.addEventListener('blur', function(e){
    if(email.value.includes('@') && email.value.includes('.') ){
        email.style.border = '1px solid green'
    }else{
        email.style.border = '1px solid red'
        error.push("Ingresar un email válido")
    }
});

clave.addEventListener('blur', function(e){
    
    if(clave.value.length >= 8){
        clave.style.border = '1px solid green'
    }else{
        clave.style.border = '1px solid red'
        error.push("Ingresar una clave")
    }
});

form.addEventListener("submit", async (e)=>{
    console.log(error.length, "------------------------");
    if(email.value.includes('@') && email.value.includes('.') ){
        email.style.border = '1px solid green'
    }else{
        if (!error.includes("Ingresar un email válido")) { 
            email.style.border = '1px solid red'
            error.push("Ingresar un email válido")   
        }
    }

    if(clave.value.length >= 8){
        clave.style.border = '1px solid green'
    }else{
        if (!error.includes("Ingresar una clave")) {
            clave.style.border = '1px solid red'
            error.push("Ingresar una clave")   
        }
    }

    if(error.length > 0 ){
        e.preventDefault();
    }
    error = []
});

});