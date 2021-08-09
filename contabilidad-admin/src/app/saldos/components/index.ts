import { SaldosTableComponent } from './saldos-table/saldos-table.component';
import { AuxiliarContableDialogComponent } from './auxiliar-contable-dialog/auxiliar-contable-dialog.component';
import { PolizadetTableComponent } from './polizadet-table/polizadet-table.component';
import { MovimientosTableComponent } from './movimientos-table/movimientos-table.component';
import { DiotTableComponent } from './diot-table/diot-table.component';
import { AuxiliarTableComponent } from './auxiliar-table/auxiliar-table.component';
import { ReclasificarBatchModalComponent } from './reclasificar-batch/reclasificar-batch-modal.component';
import { PagoIsrTableComponent } from './pago-isr-table/pago-isr-table.component';
import { PagoIsrModalComponent } from './pago-isr-modal/pago-isr-modal.component';
import { AuxiliarBancosDialogComponent } from './auxiliar-bancos-dialog/auxiliar-bancos-dialog.component';
import { AuxiliarFormComponent } from './auxiliar-form/auxiliar-form.component';

export const components: any[] = [
  SaldosTableComponent,
  AuxiliarContableDialogComponent,
  AuxiliarBancosDialogComponent,
  PolizadetTableComponent,
  MovimientosTableComponent,
  DiotTableComponent,
  AuxiliarTableComponent,
  ReclasificarBatchModalComponent,
  PagoIsrTableComponent,
  PagoIsrModalComponent,
  AuxiliarFormComponent
];
export const entryComponents: any[] = [
  AuxiliarContableDialogComponent,
  AuxiliarBancosDialogComponent,
  ReclasificarBatchModalComponent,
  PagoIsrModalComponent
];

export * from './saldos-table/saldos-table.component';
export * from './auxiliar-contable-dialog/auxiliar-contable-dialog.component';
export * from './auxiliar-bancos-dialog/auxiliar-bancos-dialog.component';
export * from './polizadet-table/polizadet-table.component';
export * from './movimientos-table/movimientos-table.component';
export * from './diot-table/diot-table.component';
export * from './auxiliar-table/auxiliar-table.component';
export * from './reclasificar-batch/reclasificar-batch-modal.component';
export * from './pago-isr-table/pago-isr-table.component';
export * from './pago-isr-modal/pago-isr-modal.component';
export * from './auxiliar-form/auxiliar-form.component';
