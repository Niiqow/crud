import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {



  constructor(private fb: FormBuilder,
              private productosService:ProductosService,
              private router: Router) { }



  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['PC', [Validators.required]],
    precio: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[0-9]*$") ]],
  });

  agregar(){
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

    // Realizar el posteo
    this.productosService.crearProducto( this.miFormulario.value )
        .subscribe( resp => {
          Toast.fire({
            icon: 'success',
            title: 'Producto Agregado'
          })
          // Navegar al Dashboard
          this.router.navigateByUrl('/');

        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error' );
        });
  }

}
