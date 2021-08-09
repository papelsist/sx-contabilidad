import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AplicacionesPageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AplicacionesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComisionesRoutingModule {}
