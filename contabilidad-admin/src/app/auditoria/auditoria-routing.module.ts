import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuditoriaPageComponent,
  MetadataPageComponent,
  AuditoriaCfdiPageComponent
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: AuditoriaPageComponent,
    children: [
      { path: 'metadata', component: MetadataPageComponent },
      { path: 'cfdi', component: AuditoriaCfdiPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditoriaRoutingModule {}
