import { ActivoFijo } from './activo-fijo';

export interface Depreciacion {
  id: number;
  ejercicio: number;
  mes: number;
  corte: string;
  activoFijo: Partial<ActivoFijo>;
  tasaDepreciacion: number;
  depreciacionAcumulada: number;
  depreciacion: number;
  remanente: number;
  dateCreeated: string;
  lastUpdated: string;
  createUser: string;
  updateUser: string;
}
