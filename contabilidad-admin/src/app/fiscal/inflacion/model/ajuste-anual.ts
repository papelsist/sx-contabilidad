import { CuentaContable } from 'app/cuentas/models';

import { AjusteConcepto } from './ajuste-concepto';

export interface AjusteAnual {
  id: number;
  ejercicio: number;
  concepto: Partial<AjusteConcepto>;
  enero: number;
  febrero: number;
  marzo: number;
  abril: number;
  mayo: number;
  junio: number;
  julio: number;
  agosto: number;
  septiembre: number;
  octubre: number;
  noviembre: number;
  diciembre: number;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
}
