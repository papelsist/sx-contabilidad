import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { SharedModule } from '../_shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { ReportesModule } from '../reportes/reportes.module';
import { CostosRoutingModule } from './costos-routing.module';

import { services } from './services';
import { guards } from './guards';
import { containers } from './containers';
import { components, entryComponents } from './components';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    ReportesModule,
    CostosRoutingModule,

    StoreModule.forFeature('costos', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...containers, ...components],
  entryComponents: [...entryComponents],
  providers: [...services, ...guards]
})
export class CostosModule {}
