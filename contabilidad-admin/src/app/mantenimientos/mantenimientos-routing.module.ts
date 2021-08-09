import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MantenimientosPageComponent } from './components/mantenimientos-page/mantenimientos-page.component';

const routes: Routes = [
  {
    path: '',
    component: MantenimientosPageComponent,
    children: [
      { path: 'fichas', loadChildren: './fichas/fichas.module#FichasModule' },
      {
        path: 'comisiones',
        loadChildren: './comisiones/comisiones.module#ComisionesModule'
      },
      {
        path: 'cheques',
        loadChildren: './cheques/cheques.module#ChequesModule'
      },
      {
        path: 'activos',
        loadChildren: 'app/activo-fijo/activo-fijo.module#ActivoFijoModule'
      },
      {
        path: 'inpcs',
        loadChildren: 'app/inpc/inpc.module#InpcModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientosRoutingModule {}
