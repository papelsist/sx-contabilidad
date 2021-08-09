import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.PolizasPageComponent,
    children: [
      {
        path: 'ingreso',
        canActivate: [],
        component: fromContainers.PolizasComponent
      },
      {
        path: 'ingreso/:polizaId',
        canActivate: [fromGuards.PolizaExistsGuard],
        component: fromContainers.PolizaComponent
      },
      {
        path: 'egreso',
        canActivate: [],
        component: fromContainers.PolizasComponent
      },
      {
        path: 'egreso/:polizaId',
        canActivate: [fromGuards.PolizaExistsGuard],
        component: fromContainers.PolizaComponent
      },
      {
        path: 'diario',
        canActivate: [],
        component: fromContainers.PolizasComponent
      },
      {
        path: 'diario/:polizaId',
        canActivate: [fromGuards.PolizaExistsGuard],
        component: fromContainers.PolizaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolizasRoutingModule {}
