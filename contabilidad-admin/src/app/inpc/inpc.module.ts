import { NgModule } from '@angular/core';

import { SharedModule } from 'app/_shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/reducer';
import { InpcEffects } from './store/effects';

import { InpcRoutingModule } from './inpc-routing.module';
import { InpcsComponent } from './components/inpcs/inpcs.component';
import { InpcsTableComponent } from './components/inpcs-table/inpcs-table.component';
import { InpcModalComponent } from './components/inpc-modal/inpc-modal.component';

@NgModule({
  declarations: [InpcsComponent, InpcsTableComponent, InpcModalComponent],
  entryComponents: [InpcModalComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('inpc', reducer),
    EffectsModule.forFeature([InpcEffects]),
    InpcRoutingModule
  ]
})
export class InpcModule {}
