class Carrito{
	constructor(id){
		this.id=id;	
		this.productos=[]					
	}
						
	anyadeArticulo(articulo){
		if(this.productos.includes(articulo)){
			this.modificaUnidades(articulo.codigo,"+")
		}else{
			this.productos.push(articulo);	
		}
	}			
				
	borraArticulo(codigo){		
	}
	
	modificaUnidades(codigo,n){
		let articulo=listaArticulos.find(a => codigo==a.codigo);;
		switch (n) {
			case "+":
				articulo.unidades+=1;
				break;
		
			case "-":
				articulo.unidades-=1;
				break;
			case "x":
				borraArticulo(articulo.codigo);
				break;
		}	
		verCarrito();	
	}	
			
	verCarrito(){
		let resultado="<table class='table table-hover tablaproductos' border='1'><tr><td></td><td>Nombre</td><td>Descripcion</td><td>Unidades</td><td>Precio</td><td></td></tr>";
		let total=0;
		this.productos.forEach(producto => {
			resultado+=`<tr><td><img src='../assets/${producto.codigo}.jpg' style="width:30px; 
			height:30px;"></td><td>${producto.nombre}</td><td>${producto.descripcion}</td>
			<td>${producto.unidades}</td><td>${producto.precio}€</td><td>
			<button onclick="modificaUnidades(${producto.codigo},'+');" style="margin-right:10px;" class='btn btn-primary'>+</button>
			<button onclick="modificaUnidades(${producto.codigo},'-');" style="margin-right:10px;" class='btn btn-warning'>-</button>
			<button onclick="modificaUnidades(${producto.codigo},'x');" style="margin-right:10px;" class='btn btn-danger'>BORRAR</button></td></tr>`
			total+=producto.precio;
		});
		resultado+="</table>"
		document.getElementById("dialogContent").innerHTML=resultado;
		document.getElementById("total").innerHTML=total+"€";

	}			
}
