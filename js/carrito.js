class Carrito{
	constructor(id){
		this.id=id;	
		this.productos=[]					
	}
						
	anyadeArticulo(articulo){
		if(this.productos.includes(articulo)){
			articulo.unidades+=1;
		}else{
			articulo.unidades=1;
			this.productos.push(articulo);
		}
	}			
				
	borraArticulo(codigo){		
		let articulo=this.productos.find(a => codigo.id==a.codigo);
		this.productos.splice(articulo,1);
		carro.verCarrito();
	}
	
	modificaUnidades(codigo,n){
		let articulo=this.productos.find(a => codigo==a.codigo);
		if(articulo.unidades==1 && n=="-"){
			carro.borraArticulo(articulo.codigo);
			return;
		}
		switch (n) {
			case "+":
				articulo.unidades+=1;
				break;
		
			case "-":
				articulo.unidades-=1;
				break;
			case "x":
				carro.borraArticulo(articulo.codigo);
				break;
		}	
		carro.verCarrito();	
	}	
			
	verCarrito(){
		let resultado="<table class='table table-hover tablaproductos' border='1'><tr><td></td><td>Nombre</td><td>Descripcion</td><td>Unidades</td><td>Precio</td><td></td></tr>";
		let total=0;
		if(this.productos.length==0){
			resultado="<p style='margin-top:20px;'>El carrito esta vacio</p>";
			document.getElementById("btnEfectuaPedido").style.display="none";
			document.getElementsByClassName("text-right")[0].style.display="none";
		}else{
			document.getElementById("btnEfectuaPedido").style.display="inline-block";
			document.getElementsByClassName("text-right")[0].style.display="block";
		this.productos.forEach(producto => {
			resultado+=`<tr><td><img src='../assets/${producto.codigo}.jpg' style="width:30px; 
			height:30px;"></td><td>${producto.nombre}</td><td>${producto.descripcion}</td>
			<td>${producto.unidades}</td><td>${producto.precio}€</td><td>
			<button id="${producto.codigo}" value="+" style="margin-right:10px;" class='btn btn-primary modifier'>+</button>
			<button id="${producto.codigo}" value="-" style="margin-right:10px;" class='btn btn-warning modifier'>-</button>
			<button id="${producto.codigo}" value="x" style="margin-right:10px;" class='btn btn-danger modifier'>BORRAR</button></td></tr>`
			total+=producto.precio * producto.unidades;
		});
		resultado+="</table>"
	}
		document.getElementById("dialogContent").innerHTML=resultado;
		let arrayBotones=document.getElementsByClassName("modifier");
		Array.from(arrayBotones).forEach(e=>{
			e.addEventListener("click",()=>this.modificaUnidades(e.id,e.value))
		})
		document.getElementById("total").innerHTML=total+"€";

	}			
}
