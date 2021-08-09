import { NgModule } from '@angular/core';

import { SharedModule } from 'app/_shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReportesModule } from 'app/reportes/reportes.module';

@NgModule({
  imports: [SharedModule, AgGridModule.withComponents([]), ReportesModule],
  exports: [SharedModule, AgGridModule, ReportesModule]
})
export class FiscalCommonModule {}
