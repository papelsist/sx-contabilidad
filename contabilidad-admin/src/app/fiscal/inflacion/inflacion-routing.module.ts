import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InflacionPageComponent } from './pages/inflacion-page/inflacion-page.component';

const routes: Routes = [{ path: '', component: InflacionPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InflacionRoutingModule {}
