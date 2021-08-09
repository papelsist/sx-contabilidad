import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [fromGuards.CuentasGuard],
    component: fromContainers.CuentasComponent
  },
  {
    path: ':cuentaId',
    canActivate: [fromGuards.CuentaExistsGuard],
    component: fromContainers.CuentaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentasRoutingModule {}
