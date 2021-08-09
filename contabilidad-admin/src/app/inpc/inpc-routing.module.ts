import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InpcsComponent } from './components/inpcs/inpcs.component';

const routes: Routes = [{ path: '', component: InpcsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InpcRoutingModule {}
