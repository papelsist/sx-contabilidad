import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivosGuard } from './guards/activos.guard';
import {
  ActivosComponent,
  ActivoCreateComponent,
  ActivoEditComponent,
  BajasComponent,
  ResumenDeActivosComponent
} from './pages';
import { ActivoExistsGuard } from './guards/activo-exists.guard';

const routes: Routes = [
  { path: '', canActivate: [ActivosGuard], component: ActivosComponent },
  { path: 'create', component: ActivoCreateComponent },
  { path: 'resumen', component: ResumenDeActivosComponent },
  { path: 'bajas', canActivate: [ActivosGuard], component: BajasComponent },
  {
    path: ':activoId',
    canActivate: [ActivoExistsGuard],
    component: ActivoEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivoFijoRoutingModule {}
