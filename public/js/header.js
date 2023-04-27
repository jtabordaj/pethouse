window.addEventListener("load", ()=>{
    let botonActivate = false
    let burgerMenu = document.querySelector("#burgerMenu") 

    burgerMenu.addEventListener("click", ()=>{
        if (!botonActivate) {

            document.querySelector(".buscador").style.opacity = 0;
            document.querySelector(".buscador").style.transition="opacity 0.3s ease-in-out"
            botonActivate = true;
            menu.classList.add("show")
            document.querySelector("#menu").style.top = "18px"
            document.querySelector("#menu").innerHTML = `<div class="contenMenu"> 
                                                            <ul>
                                                                <li><a href="/register">Registrate<i class="far fa-address-card"></i></a></li>
                                                                <li><a href="/login">Ingresar<i class="fas fa-sign-in-alt"></i></a></li>
                                                            </ul>
                                                        <div/>`;    
        } else{
            botonActivate = false
            document.querySelector(".buscador").style.opacity = 1;
            menu.classList.remove("show");
        }
        
    })
})