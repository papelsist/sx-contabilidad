import { Inventario } from '../../models/inventario';

export interface MovimientosPorProducto {
  clave: string;
  descripcion: string;
  unidad?: string;
  movimientos: Partial<Inventario>[];
}
