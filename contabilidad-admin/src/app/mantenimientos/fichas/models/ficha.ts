import * as moment from 'moment';
import { Sucursal } from 'app/models';

export interface Ficha {
  id?: string;
  folio: number;
  sucursal: { id: string; nombre: string };
  origen: string;
  fecha: string;
  cheque: number;
  efectivo: number;
  total: number;
  cuentaDeBanco: any;
  tipoDeFicha: string;
  fechaCorte: string;
  cancelada: string;
  comentario: string;
  tipo: string;
  creado?: string;
  modificado?: string;
  usuario?: string;
  ingreso?: any;
}

export class FichaFilter {
  fecha: Date;
  tipo: string;
  sucursal: string;
}

export function buildFichasFilter(): FichaFilter {
  return {
    fecha: moment()
      .subtract(2, 'days')
      .toDate(),
    tipo: 'CRE',
    sucursal: undefined
  };
}

export interface FichaBuildCommand {
  fecha: string;
  formaDePago: string;
  tipo: string;
  cuenta: string;
}

export const FICHA_FILTER_STORE_KEY = 'sx.conta.fichas.filter.key';

export function readFichaFilterFromStorage(): FichaFilter {
  const value = JSON.parse(localStorage.getItem(FICHA_FILTER_STORE_KEY));
  if (value && value.fecha) {
    value.fecha = moment(value.fecha).toDate();
  }
  return value;
}

export function storeFichaFilter(filter: FichaFilter) {
  localStorage.setItem(FICHA_FILTER_STORE_KEY, JSON.stringify(filter));
}
