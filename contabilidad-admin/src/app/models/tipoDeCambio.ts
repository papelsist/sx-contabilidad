import { Moneda } from './moneda';

export interface TipoDeCambio {
  fecha: Date;
  moneda: Moneda;
  factor: number;
  fuente: Origen;
}

export enum Origen {
  BANAMEX,
  BANCOMER,
  BANXICO
}
