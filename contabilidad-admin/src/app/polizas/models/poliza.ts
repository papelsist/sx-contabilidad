import { PolizaDet } from './poliza-det';

export interface Poliza {
  id: number;
  ejercicio: number;
  mes: number;
  tipo: string;
  folio: number;
  subtipo: string;
  fecha: string;
  concepto: string;
  sucursal: string;
  debe: number;
  haber: number;
  manual: boolean;
  cierre?: string;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
  partidas: Partial<PolizaDet>[];
  totalNacional?: number;
  totalExtranjero?: number;
  satComplementos?: string;
  satComprobantes?: string;
  banco?: string;
}

export interface PolizasFilter {
  ejercicio: number;
  mes: number;
  tipo: string;
  subtipo: string;
}
