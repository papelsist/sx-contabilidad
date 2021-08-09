import { ActivosComponent } from './activos/activos.component';
import { ActivoCreateComponent } from './activo-create/activo-create.component';
import { ActivoEditComponent } from './activo-edit/activo-edit.component';

import { BajasComponent } from './bajas/bajas.component';
import { ResumenDeActivosComponent } from './resumen-de-activos/resumen-de-activos.component';

export const pages: any[] = [
  ActivosComponent,
  ActivoCreateComponent,
  ActivoEditComponent,
  BajasComponent,
  ResumenDeActivosComponent
];

export * from './activos/activos.component';
export * from './activo-create/activo-create.component';
export * from './activo-edit/activo-edit.component';
export * from './bajas/bajas.component';
export * from './resumen-de-activos/resumen-de-activos.component';
