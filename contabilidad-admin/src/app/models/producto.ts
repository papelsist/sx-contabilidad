import { Linea } from './linea';
import { Clase } from './clase';
import { Marca } from './marca';

export interface Producto {
  id?: string;
  clave?: string;
  descripcion: string;
  linea: Linea;
  marca: Marca;
  clase: Clase;
  unidad: string;
  activo: boolean;
  ajuste: number;
  ancho: number;
  calibre: number;
  caras: number;
  deLinea: boolean;
  gramos: number;
  inventariable: boolean;
  kilos: number;
  largo: number;
  m2XMillar: number;
  modoVenta: string;
  nacional: boolean;
  precioContado: number;
  precioCredito: number;
  presentacion: string;
  lastUpdated?: string;
  selected?: boolean;
}
