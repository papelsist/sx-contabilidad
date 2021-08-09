import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.CostosPageComponent,
    children: [
      {
        path: 'promedios',
        canActivate: [fromGuards.CostosPromedioGuard],
        component: fromContainers.CostosPromedioComponent
      },
      {
        path: 'movimientos',
        // canActivate: [fromGuards.MovimientosCostoGuard],
        component: fromContainers.MovimientosCosteadosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostosRoutingModule {}
