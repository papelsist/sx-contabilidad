export interface Auxiliar {
  ejercicio: number;
  mes: number;
  clave: string;
  descripcion: string;
  fecha: string;
  poliza: number;
  tipo: 'DIARIO' | 'INGRESO' | 'EGRESO';
  subtipo: string;
  asiento: string;
  sucursal: string;
  debe: number;
  haber: number;
  inicial?: number;
  final?: number;
}
