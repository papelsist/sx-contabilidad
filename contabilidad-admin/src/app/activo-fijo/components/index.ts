import { ActivosTableComponent } from './activos-table/activos-table.component';
import { CreateActivoModalComponent } from './create-activo/create-activo-modal.component';
import { ActivoFormComponent } from './activo-form/activo-form.component';
import { AfTipoComponent } from './activo-form/af-tipo/af-tipo.component';
import { AfEstadoComponent } from './activo-form/af-estado/af-estado.component';
import { DepreciacionesTableComponent } from './depreciaciones-table/depreciaciones-table.component';
import { DepreciacioneFiscalTableComponent } from './depreciacion-fiscal-table/depreciacion-fiscal-table.component';
import { DepreciacionFiscalComponent } from './depreciacion-fiscal/depreciacion-fiscal.component';
import { AfSucursalComponent } from './activo-form/af-sucursal/af-sucursal.component';
import { ActivoBajaModalComponent } from './activo-baja/activo-baja-modal.component';
import { ResumenTableComponent } from './resumen-table/resumen-table.component';
import { BajasTableComponent } from './bajas-table/bajas-table.component';

export const components: any[] = [
  ActivosTableComponent,
  CreateActivoModalComponent,
  ActivoFormComponent,
  AfTipoComponent,
  AfEstadoComponent,
  DepreciacionesTableComponent,
  DepreciacioneFiscalTableComponent,
  DepreciacionFiscalComponent,
  AfSucursalComponent,
  ActivoBajaModalComponent,
  ResumenTableComponent,
  BajasTableComponent
];
export const entryComponents: any[] = [
  CreateActivoModalComponent,
  DepreciacionFiscalComponent,
  ActivoBajaModalComponent
];

export * from './activos-table/activos-table.component';
export * from './create-activo/create-activo-modal.component';
// Activo form
export * from './activo-form/activo-form.component';
export * from './activo-form/af-tipo/af-tipo.component';
export * from './activo-form/af-estado/af-estado.component';

export * from './depreciaciones-table/depreciaciones-table.component';
export * from './depreciacion-fiscal-table/depreciacion-fiscal-table.component';

export * from './depreciacion-fiscal/depreciacion-fiscal.component';
export * from './activo-form/af-sucursal/af-sucursal.component';

export * from './activo-baja/activo-baja-modal.component';
export * from './resumen-table/resumen-table.component';
export * from './bajas-table/bajas-table.component';
