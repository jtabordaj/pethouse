let bd = require("../database/models");
window.addEventListener('load', function() {
    let form = document.querySelector("form")
    console.log(form.querySelectorAll("input"));

    let emails = document.querySelector("#email").value
    let error = [];
    let email = document.querySelector("#userLogin");
    let clave = document.querySelector("#passwordLogin");



email.addEventListener('blur', function(e){
    console.log(email.value.length)
    if(email.value.includes('@') && email.value.includes('.') ){
        email.style.border = '1px solid green'
    }

    else{
        email.style.border = '1px solid red'
        error.push("Ingresar un email válido")
    }
});

clave.addEventListener('blur', function(e){
    console.log(clave.value.length)
    if(clave.value.length >= 8){
        clave.style.border = '1px solid green'
    }
    
    else{
        clave.style.border = '1px solid red'
        error.push("Ingresar una clave")
    }
});

form.addEventListener("submit", async (e)=>{
    let user = bd.Usuario.findOne({where: {email: emails}});
    if(await user == undefined  ){
        email.style.border = '1px solid red'
        error.push("Ingresar un email válido")
    }
  
    if(error.length>0){
        e.preventDefault();
    }
});

});