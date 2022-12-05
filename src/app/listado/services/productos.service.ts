import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Info, Product } from '../interfaces/interfaces';
import { map, tap } from 'rxjs';
import { NuevoProducto } from '../interfaces/nuevo-producto';
import { Busqueda } from '../interfaces/buscar-producto';
import { consolas } from '../interfaces/consolas';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url: string = 'https://xtxk2o5qtl.execute-api.us-east-1.amazonaws.com/products'
 //private url: string = 'http://localhost:3000'
 private idProducto!: string;

  constructor(private http: HttpClient) { }

  get headers() {
    return {
      headers: {
        'Content-Type': 'application/json',


      }
    }
  }

  
  getProductos() {

  return this.http.get<Info>( `${this.url}`, this.headers ).pipe(
    map( resp => {
   

   

     
      return {
        resp
      };
    })
  )
      
}


crearProducto( formData: NuevoProducto ) {
    
  return this.http.post(`${ this.url }`, formData )
            .pipe(
              tap( (resp: any) => {
              //  console.log(resp);
              })
            )

}
actualizarProducto( id: string, nombre: string, categoria: string, precio: number ) {
    
  return this.http.put(`${ this.url }/`+id, {nombre, categoria, precio} )
            .pipe(
              tap( (resp: any) => {
              //  console.log(resp);
              })
            )

}
eliminarProducto(id: string){

  return this.http.delete(`${ this.url }/`+id ).subscribe(
  )
}

getIdProducto(id: string){
//obtiene el id de productosComponent
 
  this.idProducto = id;

}
 consolas(): any{

  
   return consolas;
}
setIdProducto(){


  return this.http.get<Busqueda>( `${this.url}/`+this.idProducto, this.headers ).pipe(
    map( resp => {
    
      return {
        resp
      };
    })
  )

 

}


/*
getImagen(nombre: string) {

  return this.http.get<Busqueda>( `https://www.googleapis.com/customsearch/v1?key=AIzaSyBPA_2GDDsianbn7tYNcuUh6n1iMacbJoM&cx=3757a6309c1894e87&q=${nombre}&num=1&searchType=image`).pipe(
    map( resp => {
      const resp1 = resp.items;
      return {
        resp1
      };
    })
  )
      
}
*/

}
