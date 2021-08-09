import { NgModule } from '@angular/core';
import {
  CovalentDataTableModule,
  CovalentMediaModule,
  CovalentLoadingModule,
  CovalentNotificationsModule,
  CovalentLayoutModule,
  CovalentMenuModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule,
  CovalentCommonModule,
  CovalentDialogsModule,
  CovalentMessageModule,
  CovalentExpansionPanelModule,
  CovalentJsonFormatterModule,
  CovalentVirtualScrollModule
} from '@covalent/core';
// import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule,
  CovalentMediaModule,
  CovalentLoadingModule,
  CovalentNotificationsModule,
  CovalentLayoutModule,
  CovalentMenuModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule,
  CovalentCommonModule,
  CovalentDialogsModule,
  CovalentMessageModule,
  CovalentExpansionPanelModule,
  CovalentJsonFormatterModule,
  CovalentVirtualScrollModule
];

@NgModule({
  imports: [COVALENT_MODULES],
  exports: [COVALENT_MODULES],
  declarations: []
})
export class CovalentModule {}
