export interface Proveedor {
  id?: string;
  activo: boolean;
  clave: string;
  dateCreated: string;
  lastUpdated: string;
  nacional: true;
  nombre: string;
  rfc: string;
  sw2?: number;
  telefono1?: string;
  telefono2?: string;
  telefono3?: string;
  tipo: string;
  // Linea de credito
  plazo: number;
  limiteDeCredito: number;
  descuentoF: number;
  diasDF: number;
  fechaRevision: boolean;
  imprimirCosto: boolean;
  cuentaBancaria?: string;
}

export enum EstadoType {
  ACTIVOS = 'ACTIVOS',
  INACTIVOS = 'INACTIVOS',
  TODOS = 'TODOS'
}
