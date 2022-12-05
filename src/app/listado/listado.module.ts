import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { ListadoRoutingModule } from './listado-routing.module';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PaginationComponent } from './pages/pagination/pagination.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgregarComponent } from './agregar/agregar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    
    ProductosComponent,
         NavbarComponent,
         FooterComponent,
         PaginationComponent,
         ActualizarComponent,
         DashboardComponent,
         AgregarComponent,
       
  ],
  exports: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    ListadoRoutingModule,
    ReactiveFormsModule
  ]
})
export class ListadoModule { }
