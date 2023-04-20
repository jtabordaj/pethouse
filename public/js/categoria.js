window.addEventListener("load", async (e)=>{

    let tamanioPantalla = window.screen.width

    let categoria = await fetch("http://localhost:3000/apis/categoria").then(res =>{
        return res.json();
    })

    //variable para determinar el tiempo en que pasa cada foto(se ponen en msg)
    const tiempo_intervalo = 2900;
    //varriable en la cual se pone en que posicion empieza
    let posicion_actual = 0;
    let boton_avanzar = document.querySelector("#avanzar");
    let boton_retroceder = document.querySelector("#retroceder");
    let carts = document.querySelector(".categorias");
    let intervalo;
    let cantidadCart = tamanioPantalla / 300
    cantidadCart = Math.trunc(cantidadCart)

    if (cantidadCart > 1) {
        document.querySelector("#carts").style.width = "45%"
    }
    
    function pasarCart() {
        carts.innerHTML = ""
        for (let i = 0; i < cantidadCart && posicion_actual < categoria.length; i++) { 
            renderizarcart();
            posicion_actual ++
        }
                
        if (posicion_actual > categoria.length -1){
            posicion_actual = 0;
        }
        
    }

    function retocederCart() {
        if (posicion_actual <= 0){
            posicion_actual = categoria.lengt - 1;
        }else{
            posicion_actual --;
        }
    }

    function renderizarcart(){
        carts.innerHTML += `<article class="cart1">
                                <a href="">
                                    <picture class="imgcart">
                                        <img src="/img/${categoria[posicion_actual].img}">
                                    </picture> 
                                    <article class="abajofoto"> 
                                        <p>${categoria[posicion_actual].categoria}</p>  
                                    </article>
                                </a>
                            </article>`;
        
    }
    function empezarIntervalo() {
        intervalo = setInterval(pasarCart, tiempo_intervalo)
    }
    
    empezarIntervalo();
})