import { NgModule } from '@angular/core';

import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { SharedModule } from 'app/_shared/shared.module';
import { FichasModule } from './fichas/fichas.module';
import { MantenimientosPageComponent } from './components/mantenimientos-page/mantenimientos-page.component';

@NgModule({
  imports: [SharedModule, MantenimientosRoutingModule, FichasModule],
  declarations: [MantenimientosPageComponent]
})
export class MantenimientosModule {}
