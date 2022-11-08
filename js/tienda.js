	criterios=["Sin ordenar","Ascendente por precio", "Descendente por precio"]
	let carro=null;
	function creaListaCriterios(){
		let selector=document.getElementById("criteriosOrdenacion");
		criterios.forEach(c => {
			let item=document.createElement("option");
			item.setAttribute("value",c)
			item.appendChild(document.createTextNode(c));
			selector.appendChild(item);
		});
		selector.addEventListener("change",function(){pintaArticulos(selector.value)});
	}


	function pintaArticulos(orden){
		reset();
		let contenedor=document.getElementById("contenedor");
		let copiaLista=[].concat(listaArticulos);
		switch(orden){
			case "Sin ordenar":
				break;
			case "Ascendente por precio":
				copiaLista.sort((a,b) => a.precio - b.precio);
				console.log(copiaLista);
				break;
			case "Descendente por precio":
				copiaLista.sort((a,b) => b.precio - a.precio);
				break;
		}
		copiaLista.forEach(articulo => {
			contenedor.innerHTML+=`<div class="col">
			<div class="card">
				<img src='../assets/${articulo.codigo}.jpg'>
				<div class="card-body">
					<h5 class="card-title">${articulo.nombre}</h5>
					<p class="card-text">${articulo.descripcion}</p>
					<b>
						<p class="card-text text-center">${articulo.precio}</p>
					</b>
				</div>
				<button onclick="ponArticuloEnCarrito(this.id);" id="${articulo.codigo}" class="btn-success">comprar</button>
			</div>
		</div>`;
		});
		
	}
	
	function reset(){
		document.getElementById("contenedor").innerHTML="";
	}
	
	function ponArticuloEnCarrito(id){
		let articulo=listaArticulos.find(a => id==a.codigo);
		carro.anyadeArticulo(articulo);
	}


	function verCarro(){
		carro.verCarrito();
		document.getElementById("miDialogo").showModal();
		document.body.style="opacity:0.3; overflow:hidden;";
	}

	function unShowCarro(){
		document.getElementById("miDialogo").close();
		document.body.style="opacity:1; overflow:visible;";
	}

	function efectuaPedido(){
	
	}

	window.onload=()=>{
		let numRandom=Math.random() * 7000;
		carro=new Carrito(Math.trunc(numRandom))
		creaListaCriterios();
		pintaArticulos();
		document.getElementById("imagencarrito").onclick=verCarro;
		document.getElementById("close").onclick=unShowCarro;
		document.getElementById("btnCierraDialog").onclick=unShowCarro;
	}


