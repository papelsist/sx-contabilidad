import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatInputModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatDialogModule,
  MatTabsModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSliderModule
} from '@angular/material';

const MATERIAL_MODULES: any[] = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatInputModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatTabsModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSliderModule
];
/**
 * Special module to controll Material desing modules
 */
@NgModule({
  imports: [CommonModule, MATERIAL_MODULES],
  declarations: [],
  exports: [MATERIAL_MODULES]
})
export class MaterialModule {}
