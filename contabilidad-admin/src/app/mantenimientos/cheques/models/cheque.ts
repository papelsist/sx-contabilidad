
import { Periodo } from '../../../_core/models/periodo';
import { CuentaDeBanco } from './cuentaDeBanco';



export interface Cheque {
  id: string;
  nombre: string;
  cuenta: Partial<CuentaDeBanco>;
  fecha: string;
  folio?: number;
  impresion?: string;
  egreso: { id: string };
  confidencial?: boolean;
  importe: number;
  liberado?: string;
  entregado?: string;
  cobrado?: string;
  creado?: string;
  modificado?: string;
  createUser: string;
  updateUser: string;
  cancelado?: string;
  canceladoComentario?: string;
  fechaTransito?: string;
}
export class ChequesFilter {
  fechaInicial?: Date;
  fechaFinal?: Date;
  nombre?: string;
  registros?: number;
}

export function createChequesFilter(): ChequesFilter {
  const { fechaInicial, fechaFinal } = Periodo.fromNow(20);
  const registros = 50;
  return {
    fechaInicial,
    fechaFinal,
    registros
  };
}
