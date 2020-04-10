//1. OBTENER EL TEXTO DE LA ETIQUETA INPUT

//OBTENGO LA PALABRA INTRODUCIDA Y LA ENVIO A LA URL DE LA API A TRAVES DEL CLICK EN EL BOTON:
document
	.querySelector(".js-buscar")
	.addEventListener('click',function(){ //Añado logica al boton de buscar.
		
		var palabra = document.querySelector("input").value; //Recojo la palabra.
		accederApi(palabra);

	});

//OBTENGO LA PALABRA INTRODUCIDA Y LA ENVIO A LA URL DE LA API, PULSANDO INTRO:
document
	.querySelector(".js-userinput")
	.addEventListener('keyup',function(e){
		
		var palabra = document.querySelector("input").value; //Recojo la palabra.
	
		//SI LA TECLA PRESIONADA ES EL ENTER, MUESTRA EN EL CONTENEDOR. which trabaja con keyCode, cada tecla tiene un numero.
		if(e.which === 13){ 
			accederApi(palabra);
		}	
});


//2. LLAMADA A LA API CON LA PALABRA INTRODUCIDA.
function accederApi(palabra){
	
	var url = "http://api.giphy.com/v1/gifs/search?q=\"" + palabra + "\"&api_key=ukhgLgRMSQwmJkNqadFkm2qiEjLfHJLs";

	//AJAX
	var llamadaGif = new XMLHttpRequest();
	llamadaGif.open('GET',url);
	llamadaGif.send();

	llamadaGif
		.addEventListener('load',function(e){

			var datos = e.target.response;
			mostrarGif(datos);
	});	
}


//3. MOSTRAR LOS GIF

function mostrarGif(listaGif){
	
	var listado = JSON.parse(listaGif);
	var imagenUrl = listado.data;
	
	//LIMPIEZA
	var contenedor = document.querySelector(".contenedor-gif-js");
	contenedor.innerHTML = "";
	//----
	
	imagenUrl
		.forEach(function(imagen){
						
			var src = imagen.images.fixed_height.url; //ATRAPA LA URL DEL JSON.
			var contenedorPrincipal = document.querySelector(".contenedor-gif-js"); //ATRAPA EL CONTENT PRINCIPAL.

			var componenteImg = "<img src=\"" + src + "\" class=\"container-image\">";

			contenedorPrincipal.innerHTML += componenteImg;					
	});	
}
