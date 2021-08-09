import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/cheques.reducer';
import { components, entryComponents } from './components';
import { ChequesRoutingModule } from './cheques-routing.module';
import { SharedModule } from '../../_shared/shared.module';
import { ChequesEffects } from './store/cheques.effects';
import { ChequesService } from './services/cheques.service';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ChequesRoutingModule,
    StoreModule.forFeature('cheques', reducer),
    EffectsModule.forFeature([ChequesEffects])
  ],
  declarations: [...components, ...entryComponents],
  entryComponents: [...entryComponents],
  providers: [ChequesService]
})
export class ChequesModule { }
