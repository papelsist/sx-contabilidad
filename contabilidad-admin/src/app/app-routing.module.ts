import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './_core/containers/main-page/main-page.component';
import { HomePageComponent } from './_core/containers/home-page/home-page.component';
import { AuthGuard } from './auth/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomePageComponent },
      {
        path: 'cuentas',
        loadChildren: './cuentas/cuentas.module#CuentasModule'
      },
      {
        path: 'saldos',
        loadChildren: './saldos/saldos.module#SaldosModule'
      },
      {
        path: 'polizas',
        loadChildren: './polizas/polizas.module#PolizasModule'
      },
      {
        path: 'costos',
        loadChildren: './costos/costos.module#CostosModule'
      },
      {
        path: 'econta',
        loadChildren: './econta/econta.module#EcontaModule'
      },
      {
        path: 'operaciones',
        loadChildren:
          './mantenimientos/mantenimientos.module#MantenimientosModule'
      },
      {
        path: 'fiscal',
        loadChildren: './fiscal/fiscal.module#FiscalModule'
      },
      {
        path: 'auditoria',
        loadChildren: './auditoria/auditoria.module#AuditoriaModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
/**
 * {
      icon: 'home',
      route: '/',
      title: 'Inicio'
    },
    {
      icon: 'storage',
      route: '/cuentas',
      title: 'Catálogo de cuentas'
    },
    {
      icon: 'settings_input_component',
      route: '/costos',
      title: 'Costos'
    }
 */
