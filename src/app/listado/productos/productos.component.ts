import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ProductosService } from '../services/productos.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  public productos!: any;
 //public link! : string;
  constructor(private productosService: ProductosService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.buscar();

  }

  buscar(){
    this.productosService.getProductos().subscribe( ({resp} ) =>{

      this.productos = resp.body

    

    })
    
  }

  ver(id: string){
  

  
    this.productosService.getIdProducto(id);
  
    this.router.navigateByUrl('/actualizar');
  }
/*
  imagen(nombre: string){
    this.productosService.getImagen(nombre).subscribe( ({resp1}) =>{

      
     this.link = resp1[0].link;
     

    })
  }
*/

}
