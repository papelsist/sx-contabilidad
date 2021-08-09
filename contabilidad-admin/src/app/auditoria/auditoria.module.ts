import { NgModule } from '@angular/core';

import { AuditoriaRoutingModule } from './auditoria-routing.module';
import { SharedModule } from '../_shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { components, entryComponents } from './components';
import { pages } from './pages';
import { AuthModule } from '../auth/auth.module';
import { ReportesModule } from '../reportes/reportes.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    SharedModule,
    AgGridModule.withComponents([]),
    AuthModule,
    ReportesModule,
    AuditoriaRoutingModule,
    StoreModule.forFeature('auditoria', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...components, ...pages],
  entryComponents: [...entryComponents]
})
export class AuditoriaModule {}
