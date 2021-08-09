import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiscalPageComponent } from './fiscal-page/fiscal-page.component';

const routes: Routes = [
  {
    path: '',
    component: FiscalPageComponent,
    children: [
      {
        path: 'ajusteAnualPorInflacion',
        loadChildren: './inflacion/inflacion.module#InflacionModule'
      },
      {
        path: 'declaracionAnual',
        loadChildren:
          './declaracion-anual/declaracion-anual.module#DeclaracionAnualModule'
      },
      {
        path: 'ivaAcreditable',
        loadChildren:
          './iva-acreditable/iva-acreditable.module#IvaAcreditableModule'
      },
      {
        path: 'ivaCobrado',
        loadChildren: './iva-cobrado/iva-cobrado.module#IvaCobradoModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiscalRoutingModule {
  constructor() {
    console.log('Fiscal routing....');
  }
}
