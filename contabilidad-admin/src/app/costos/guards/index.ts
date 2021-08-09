import { CostosPromedioGuard } from './costos-promedio.guard';
import { MovimientosCostoGuard } from './movimientos-costo.guard';

export const guards: any[] = [CostosPromedioGuard, MovimientosCostoGuard];

export * from './costos-promedio.guard';
export * from './movimientos-costo.guard';
