import { NgModule } from '@angular/core';

import { ReportService } from './services/report.service';
import { components, entryComponents } from './components';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [...components],
  entryComponents: [...entryComponents],
  providers: [ReportService],
  exports: [...components]
})
export class ReportesModule {
  /*
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ReportesModule,
      providers: [ReportService]
    };
  }
  */
}
