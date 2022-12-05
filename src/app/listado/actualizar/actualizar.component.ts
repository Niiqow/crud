import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../models/producto.model';
import { consolas } from '../interfaces/consolas';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})


export class ActualizarComponent implements OnInit{
 idProducto!: string;
nombre! : string;
categoria! : string;
precio! : number;
Consolas: any = consolas;

 public productos: Producto[] = [];
 constructor(private fb: FormBuilder,
  private productosService:ProductosService,
  private router: Router) { 
    


  this.obtenerDatos();
  

   }
  ngOnInit(): void {

  }

  obtenerDatos(){
    this.productosService.setIdProducto().subscribe( ({resp} ) =>{
      this.idProducto = resp.msg._id;
      this.nombre = resp.msg.nombre;
      this.categoria = resp.msg.categoria;
      this.precio = resp.msg.precio;
   
  

        })

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
    console.log( this.miFormulario.value );

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
 



 

