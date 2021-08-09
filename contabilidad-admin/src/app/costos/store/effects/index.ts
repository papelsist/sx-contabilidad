import { CostoPromedioEffects } from './costo-promedio.effects';
import { MovimientosCostoEffects } from './movimientos-costo.effect';
import { MovimientosEffects } from './movimientos-effect';

export const effects: any[] = [
  CostoPromedioEffects,
  MovimientosCostoEffects,
  MovimientosEffects
];

export * from './costo-promedio.effects';
export * from './movimientos-costo.effect';
export * from './movimientos-effect';
