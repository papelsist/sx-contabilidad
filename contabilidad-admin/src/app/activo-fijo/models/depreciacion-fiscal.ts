import { ActivoFijo } from './activo-fijo';

export interface DepreciacionFiscal {
  id: number;
  ejercicio: number;
  activoFijo: Partial<ActivoFijo>;
  inpcPrimeraMitad: number;
  inpcDelMesAdquisicion: number;
  factorDeActualizacion: number;
  depreciacionAcumulada: number;
  depreciacionFiscal: number;
  dateCreeated: string;
  lastUpdated: string;
  createUser: string;
  updateUser: string;
}
