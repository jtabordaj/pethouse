window.addEventListener("load", ()=>{

    let botonActivate = false;
    let burgerMenu = document.querySelector("#burgerMenu");
    
    let contenidoBuscador = document.querySelector(".inBuscador");
    let botonBuscador = document.querySelector(".botonBuscador");

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

    botonBuscador.addEventListener("click", async(a)=>{
        let contenido = contenidoBuscador.value; 
        a.defaultPrevented;
        console.log("entro------------");
        let produc = await fetch(`http://localhost:3000/apis/buscador/${contenido}`).then(res =>{
            return res.json();
        })
        console.log(produc);
    })
})