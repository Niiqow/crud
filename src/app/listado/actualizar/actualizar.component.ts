import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../models/producto.model';
import { consolas } from '../interfaces/consolas';
import { Body } from '../interfaces/interfaces';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})


export class ActualizarComponent implements OnInit{
 idProducto!: any;
nombre! : string;
categoria! : string;
precio! : number;
Consolas: any = consolas;
productos!: any;
 constructor(private fb: FormBuilder,
  private productosService:ProductosService,
  private router: Router) { 
    

  this.idProducto = localStorage.getItem('id');
  this.obtenerDatos();
//console.log(this.idProducto)

   }
  ngOnInit(): void {
 
  }



  obtenerDatos(){



    this.productosService.setIdProducto(this.idProducto).subscribe( ({resp} ) =>{

      this.productos = resp.body;

     
     this.nombre = this.productos.nombre;
     this.categoria = this.productos.categoria; 
     this.precio = this.productos.precio;
  

     this.miFormulario.controls['nombre'].setValue(this.productos.nombre);
     this.miFormulario.controls['categoria'].setValue(this.productos.categoria);
     this.miFormulario.controls['precio'].setValue(this.productos.precio);     

    
 
        })
        //console.log(this.miFormulario.value)
  }

  miFormulario: FormGroup<any> = this.fb.group({
    nombre: [[Validators.required, Validators.minLength(3)]],
    categoria:[[Validators.required]],
    precio: [[Validators.required, Validators.minLength(3), Validators.pattern("^[0-9]*$") ]],
  });

  actualizar(){
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    //console.log( this.miFormulario.value );

    if ( this.miFormulario.invalid ) {
      return;
    }
    const {nombre,categoria, precio} = this.miFormulario.value;

    
    // Realizar el posteo
    this.productosService.actualizarProducto(this.idProducto, nombre, categoria, precio)
        .subscribe( resp => {
          Toast.fire({
            icon: 'success',
            title: 'Producto Actualizado'
          })
          // Navegar al Dashboard
          this.router.navigateByUrl('/');

        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error' );
        });
  }


   borrarProducto(){

  
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Swal.fire({
      title: 'Desea eliminar este producto?',
      showDenyButton: false,
      showCancelButton: true,
      buttonsStyling: true,
      cancelButtonColor: 'gray',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productosService.eliminarProducto(this.idProducto);
        this.router.navigateByUrl('/productos');

        Toast.fire({
          icon: 'error',
          title: 'Producto Eliminado'
        })
      } 
    })
   }  
   
  }
 



 

