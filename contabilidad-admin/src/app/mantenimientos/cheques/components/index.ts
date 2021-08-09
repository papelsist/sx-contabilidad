import { ChequesPageComponent } from './cheques-page/cheques-page.component';
import { ChequesFilterBtnComponent } from './cheques-filter/cheques-filter-btn.component';
import { ChequesFilterComponent } from './cheques-filter/cheques-filter.component';
import { ChequesFilterLabelComponent } from './cheques-filter/cheques-filter-label.component';
import { ChequesTableComponent } from './cheques-table/cheques-table.component';


export const components: any[] = [
 ChequesPageComponent,
 ChequesFilterBtnComponent,
 ChequesFilterComponent,
 ChequesFilterLabelComponent,
 ChequesTableComponent
];

export const entryComponents: any[] = [
    ChequesPageComponent,
    ChequesFilterBtnComponent,
    ChequesFilterComponent,
    ChequesFilterLabelComponent];

export * from './cheques-page/cheques-page.component';
export * from './cheques-filter/cheques-filter-btn.component';
export * from './cheques-filter/cheques-filter.component';
export * from './cheques-filter/cheques-filter-label.component';
