import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.SaldosPageComponent,
    children: [
      {
        path: 'mayor',
        canActivate: [fromGuards.SaldosGuard],
        component: fromContainers.SaldosComponent
      },
      {
        path: 'mayor/:saldoId',
        component: fromContainers.SaldoComponent,
        canActivate: [fromGuards.SaldoExistsGuard]
      },
      {
        path: 'balanza',
        component: fromContainers.BalanzaPageComponent
      },
      {
        path: 'auxiliar',
        component: fromContainers.AuxiliarComponent
      },
      {
        path: 'auxiliarBancos',
        component: fromContainers.AuxiliarBancosComponent
      },
      {
        path: 'diot',
        component: fromContainers.DiotComponent
      },
      {
        path: 'pagoIsr',
        component: fromContainers.PagoIsrComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaldosRoutingModule {}
