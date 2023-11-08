import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando=true;
  productos:any;
  productosFiltrados:any[]=[];

  constructor( private http:HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(){

    return new Promise( (resolve,reject)=>{
      
      this.http.get('https://angular-html-51a65-default-rtdb.firebaseio.com/productos_idx.json')
          .subscribe(resp=>{
            this.productos=resp;
            this.cargando=false;
            resolve;
          });
    });
  }

  getProducto(id:string){
    return this.http.get(`https://angular-html-51a65-default-rtdb.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto(termino:string){

    if(this.productos.length===0){
      this.cargarProductos().then( ()=>{
        this.filtrarProductos(termino);
      } )
    }else{
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino:string){
    const terminoLower= termino.toLowerCase();
    this.productosFiltrados=[];

    this.productos.forEach((prod:any) => {

      const tituloLower= prod.titulo.toLowerCase();

      if(prod.categoria.indexOf(terminoLower)>=0 || tituloLower.indexOf(terminoLower)>=0){
        this.productosFiltrados.push(prod);
      }
    });

  }
}
