export interface CuentaDeBanco {
  id?: string;
  numero: string;
  clave: string;
  descripcion: string;
  banco?: string;
  tipo: string;
  moneda: string;
  activo: boolean;
  disponibleEnPagos: boolean;
  disponibleEnVentas: boolean;
  subCuentaOperativa: string;
  impresionTemplate: string;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
  proximoCheque?: number;
  bancoSat?: { id: string };
  comisionPorTransferencia?: number;
  cuentaConcentradora?: boolean;
  rendimientoTasa?: number;
  tasaIsr?: number;
}
