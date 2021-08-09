import { NgModule } from '@angular/core';

import { FiscalCommonModule } from '../fiscal-common/fiscal-common.module';
import { DeclaracionAnualRoutingModule } from './declaracion-anual-routing.module';
import { DeclaracionPageComponent } from './declaracion-page/declaracion-page.component';

@NgModule({
  imports: [FiscalCommonModule, DeclaracionAnualRoutingModule],
  declarations: [DeclaracionPageComponent]
})
export class DeclaracionAnualModule {}
