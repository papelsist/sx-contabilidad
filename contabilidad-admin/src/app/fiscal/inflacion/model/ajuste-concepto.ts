import { CuentaContable } from 'app/cuentas/models';

export interface AjusteConcepto {
  id: number;
  cuenta: Partial<CuentaContable>;
  clave: string;
  concepto: string;
  tipo: string;
  grupo: string;
  activo: boolean;
  createUser?: string;
  updateUser?: string;
  dateCreated?: string;
  lastUpdated?: string;
}
