import { NgModule } from '@angular/core';

import { SharedModule } from 'app/_shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/aplicacion-de-corte.reducer';
import { AplicacionDeCorteEffects } from './store/aplicacion-de-corte.effects';

import { ComisionesRoutingModule } from './comisiones-routing.module';

import { components, entryComponents } from './components';

@NgModule({
  imports: [
    SharedModule,
    ComisionesRoutingModule,
    StoreModule.forFeature('comisionesTarjeta', reducer),
    EffectsModule.forFeature([AplicacionDeCorteEffects])
  ],
  declarations: [...components, ...entryComponents],
  entryComponents: [...entryComponents]
})
export class ComisionesModule {}
