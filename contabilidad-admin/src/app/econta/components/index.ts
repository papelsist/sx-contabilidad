import { CatalogosTableComponent } from "./catalogos-table/catalogos-table.component";
import { BalanzasTableComponent } from "./balanzas-table/balanzas-table.component";
import { PolizasPeriodoTableComponent } from "./polizas-periodo-table/polizas-periodo-table.component";
import { PolizasPorPeriodoCreateDialogComponent } from "./polizas-del-periodo-create-dialog/polizas-del-periodo-create-dialog.component";
import { SqlFormComponent } from "./sql-form/sql-form.component";
import { EmpresaSelectorComponent } from "./empresa-selector/empresa-selector.component";
import { EcontaCuentasTableComponent } from "./cuentas-table/econta-cuentas-table.component";
import { EcontaItemButtonsComponent } from "./buttons/econta-item-buttons.component";
import { EcontaBalanzaItemsTableComponent } from "./balanza-item-table/balanza-item-table.component";

export const components: any[] = [
  CatalogosTableComponent,
  BalanzasTableComponent,
  PolizasPeriodoTableComponent,
  PolizasPorPeriodoCreateDialogComponent,
  SqlFormComponent,
  EmpresaSelectorComponent,
  EcontaCuentasTableComponent,
  EcontaItemButtonsComponent,
  EcontaBalanzaItemsTableComponent
];

export const entryComponents: any[] = [
  PolizasPorPeriodoCreateDialogComponent,
  SqlFormComponent,
  EmpresaSelectorComponent
];

export * from "./catalogos-table/catalogos-table.component";
export * from "./balanzas-table/balanzas-table.component";
export * from "./polizas-periodo-table/polizas-periodo-table.component";
export * from "./polizas-del-periodo-create-dialog/polizas-del-periodo-create-dialog.component";
export * from "./sql-form/sql-form.component";
export * from "./empresa-selector/empresa-selector.component";
export * from "./cuentas-table/econta-cuentas-table.component";
export * from "./buttons/econta-item-buttons.component";
export * from "./balanza-item-table/balanza-item-table.component";
