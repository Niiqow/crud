import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoRoutingModule } from './listado/listado-routing.module';

const routes: Routes = [
  {
    path: 'productos',
    loadChildren: () => import('./listado/listado.module').then(m => m.ListadoModule)
  },
  {
    path: '**',
    redirectTo: 'productos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            ListadoRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
