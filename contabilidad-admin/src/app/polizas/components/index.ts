import { PolizasTableComponent } from './polizas-table/polizas-table.component';
import { PolizaFormComponent } from './poliza-form/poliza-form.component';
import { AgregarPolizadetBtnComponent } from './poliza-det-form/agregar-poliza-det-btn.component';
import { PolizaCreateComponent } from './poliza-create/poliza-create.component';
import { PolizaPartidasTableComponent } from './poliza-partidas-table/poliza-partidas-table.component';
import { PolizaDetComponent } from './poliza-det-form/poliza-det-form.component';
import { ComprobantesDialogComponent } from './comprobantes-dialog/comprobantes-dialog.component';
import { AjusteCobranzaComponent } from './ajuste-cobranza/ajuste-cobranza.component';
import { ReclasificarModalComponent } from './reclasificar/reclasificar-modal.component';
import { PolizadetModalComponent } from './polizadet-modal/polizadet-modal.component';
import { ProrrateoModalComponent } from './prorrateo-modal/prorrateo-modal.component';

export const components: any[] = [
  PolizasTableComponent,
  PolizaFormComponent,
  AgregarPolizadetBtnComponent,
  PolizaCreateComponent,
  PolizaPartidasTableComponent,
  PolizaDetComponent,
  ComprobantesDialogComponent,
  AjusteCobranzaComponent,
  ReclasificarModalComponent,
  PolizadetModalComponent,
  ProrrateoModalComponent
];

export const entryComponents: any[] = [
  PolizaCreateComponent,
  PolizaDetComponent,
  ComprobantesDialogComponent,
  AjusteCobranzaComponent,
  ReclasificarModalComponent,
  PolizadetModalComponent,
  ProrrateoModalComponent
];

export * from './polizas-table/polizas-table.component';
export * from './poliza-form/poliza-form.component';
export * from './poliza-create/poliza-create.component';
export * from './poliza-partidas-table/poliza-partidas-table.component';
export * from './poliza-det-form/poliza-det-form.component';
export * from './poliza-det-form/agregar-poliza-det-btn.component';
export * from './comprobantes-dialog/comprobantes-dialog.component';
export * from './ajuste-cobranza/ajuste-cobranza.component';
export * from './reclasificar/reclasificar-modal.component';
export * from './polizadet-modal/polizadet-modal.component';
export * from './prorrateo-modal/prorrateo-modal.component';
