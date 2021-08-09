export interface Inventario {
  id: string;
  clave: string;
  descripcion: string;
  fecha: string;
  documento: number;
  tipo: string;
  sucuralNombre: string;
  renglon: number;
  tipoVenta: string;
  cantidad: number;
  kilos: number;
  nacional: boolean;
  costo: number;
  costoPromedio: number;
  costoUltimaCompra: number;
  costoReposicion: number;
  comentario: string;
  dateCreated: string;
  lastUpdated: string;
  createUser: string;
  updateUser: string;
}
