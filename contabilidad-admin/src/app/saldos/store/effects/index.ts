import { SaldosEffects } from './saldos.effects';
import { MovimientosEffects } from './movimientos.effects';
import { DiotEffects } from './diot.effects';
import { AuxiliarEffects } from './auxiliar.effects';
import { PagoIsrEffects } from './pago-isr.effects';
import { BalanzaEffects } from './balanza.effects';

export const effects: any[] = [
  SaldosEffects,
  MovimientosEffects,
  DiotEffects,
  AuxiliarEffects,
  PagoIsrEffects,
  BalanzaEffects
];

export * from './saldos.effects';
export * from './movimientos.effects';
export * from './diot.effects';
export * from './auxiliar.effects';
export * from './pago-isr.effects';
export * from './balanza.effects';
