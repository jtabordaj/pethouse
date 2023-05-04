window.addEventListener("load", async (e)=>{

    let tamanioPantalla = window.screen.width

    let product = await fetch("http://localhost:3000/apis/product").then(res =>{
        return res.json();
    })

    //variable para determinar el tiempo en que pasa cada foto(se ponen en msg)
    const tiempo_intervalo = 2900;
    //varriable en la cual se pone en que posicion empieza
    let posicion_actual = 0;
    
    let carts = document.querySelector("#carts");
    let intervalo;
    let cantidadCart = tamanioPantalla / 300
    cantidadCart = Math.trunc(cantidadCart)

    if (cantidadCart > 1) {
        document.querySelector("#carts").style.width = "80%"
    }
    
    function pasarCart() {
        carts.innerHTML = ""
        for (let i = 0; i < cantidadCart && posicion_actual < product.length; i++) { 
            renderizarcart();
            posicion_actual ++
        }
                
        if (posicion_actual > product.length -1){
            posicion_actual = 0;
        }
        
    }

    function retocederCart() {
        if (posicion_actual <= 0){
            posicion_actual = product.lengt - 1;
        }else{
            posicion_actual --;
        }
    }

    function renderizarcart(){
        carts.innerHTML += `<article class="cart1">
                                <a href="productDetail/${product[posicion_actual].id}">
                                    <picture class="imgcart">
                                        <img src="/img/product/${product[posicion_actual].img}">
                                    </picture> 
                                    <article class="abajofoto"> 
                                        <p>${product[posicion_actual].nombre}</p> 
                                        <p>${product[posicion_actual].precio}</p> 
                                    </article>
                                </a>
                            </article>`;
        
    }
    function empezarIntervalo() {
        intervalo = setInterval(pasarCart, tiempo_intervalo)
    }
    
    empezarIntervalo();
})