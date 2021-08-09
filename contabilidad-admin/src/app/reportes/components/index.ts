import { ReportButtonComponent } from './report-button/report-button.component';
import { RepPeriodoSucursalComponent } from './rep-periodo-sucursal/rep-periodo-sucursal.component';
import { KardexReportComponent } from './kardex-report/kardex-report.component';
import { VentasDiariasDialogComponent } from './ventas-diarias/ventas-diarias-dialog.component';
import { SucursalFechaDialogComponent } from './sucursal-fecha-dialog/sucursal-fecha-dialog.component';

export const components: any[] = [
  ReportButtonComponent,
  RepPeriodoSucursalComponent,
  KardexReportComponent,
  VentasDiariasDialogComponent,
  SucursalFechaDialogComponent
];

export const entryComponents: any[] = [
  RepPeriodoSucursalComponent,
  KardexReportComponent,
  VentasDiariasDialogComponent,
  SucursalFechaDialogComponent
];

export * from './report-button/report-button.component';
export * from './rep-periodo-sucursal/rep-periodo-sucursal.component';
export * from './kardex-report/kardex-report.component';
export * from './ventas-diarias/ventas-diarias-dialog.component';
export * from './sucursal-fecha-dialog/sucursal-fecha-dialog.component';
