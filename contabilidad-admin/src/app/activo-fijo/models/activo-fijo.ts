import { Proveedor } from 'app/models/proveedor';
import { CuentaContable } from 'app/cuentas/models';
import { BajaDeActivo } from './baja-de-activo';

export interface ActivoFijo {
  id: number;
  adquisicion: string;
  descripcion: string;
  serie: string;
  modelo: string;
  // Factura orignal
  facturaSerie: string;
  facturaFolio: string;
  uuid: string;
  // Clasificacion
  estado: string;
  cuentaContable: Partial<CuentaContable>;
  // Origen
  gastoDet: any;
  proveedor: Partial<Proveedor>;
  // Consignatario
  sucursalOrigen: string;
  sucursalActual: string;
  departamentoOrigen: string;
  departamentoActual: string;
  consignatario: string;
  // Importes generales
  montoOriginal: number;
  tasaDepreciacion: number;
  depreciacionAcumulada: number;
  depreciacionInicial: number;
  remanente: number;
  // Log
  createUser: string;
  updateUser: string;
  dateCreated: string;
  lastUpdated: string;
  ultimaDepreciacion?: number;
  ultimaDepreciacionFecha?: string;
  ultimaDepreciacionFiscal?: number;
  ultimaDepreciacionFiscalEjercicio?: number;
  inpcDelMesAdquisicion?: number;
  inpcPrimeraMitad?: number;
  baja?: Partial<BajaDeActivo>;
  depreciado?: string;
}
