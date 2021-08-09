import { NgModule } from '@angular/core';

import { FiscalRoutingModule } from './fiscal-routing.module';
import { SharedModule } from '../_shared/shared.module';

import { AuthModule } from '../auth/auth.module';
import { ReportesModule } from '../reportes/reportes.module';
import { AgGridModule } from 'ag-grid-angular';

import { FiscalPageComponent } from './fiscal-page/fiscal-page.component';

@NgModule({
  imports: [
    SharedModule,
    AgGridModule.withComponents([]),
    AuthModule,
    ReportesModule,
    FiscalRoutingModule
  ],
  declarations: [FiscalPageComponent]
})
export class FiscalModule {}
