export interface CostoPromedio {
  id?: number;
  ejercicio: number;
  mes: number;
  producto: { id: string };
  linea?: string;
  marca?: string;
  clase?: string;
  clave: string;
  descripcion: string;
  costoAnterior: number;
  costo: number;
  creeado?: string;
  modificado?: string;
  dirferencia?: number;
  selected?: boolean;
}
