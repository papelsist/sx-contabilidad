export interface PolizasPeriodo {
  id: number;
  ejercicio: number;
  mes: number;
  versionSat: string;
  rfc: string;
  emisor: string;
  tipoDeSolicitud: string;
  numOrden?: string;
  numTramite?: string;
  fileName: string;
  dateCreated?: string;
  lastUpdated?: string;
  createUser: string;
  updateUser: string;
}
