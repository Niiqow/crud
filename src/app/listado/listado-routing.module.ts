import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgregarComponent } from './agregar/agregar.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path:'productos',
        component: ProductosComponent
      },
      {
        path:'agregar',
        component: AgregarComponent
      },
      {
        path:'actualizar',
        component: ActualizarComponent
      },
      {
        path:'**',
        redirectTo: 'productos'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadoRoutingModule { }
