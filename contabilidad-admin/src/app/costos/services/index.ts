import { CostoPromedioService } from './costo-promedio.service';
import { MovimientosCostoService } from './movimientos-costo.service';
import { InventarioService } from './inventario.service';

export const services: any[] = [CostoPromedioService, MovimientosCostoService, InventarioService];

export * from './costo-promedio.service';
export * from './movimientos-costo.service';
export * from './inventario.service';
