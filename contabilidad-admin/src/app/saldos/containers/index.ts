import { SaldosPageComponent } from './saldos-page/saldos-page.component';
import { SaldosComponent } from './saldos/saldos.component';
import { SaldoComponent } from './saldo/saldo.component';

import { AuxiliarComponent } from './auxiliar/auxiliar.component';
import { MovimientosPorCuentaComponent } from './movimientos-por-cuenta/movimientos-por-cuenta.component';
import { BalanzaPageComponent } from './balanza/balanza-page.component';
import { DiotComponent } from './diot/diot.component';
import { AuxiliarBancosComponent } from './auxiliar-bancos/auxiliar-bancos.component';
import { PagoIsrComponent } from './pago-isr/pago-isr.component';

export const containers: any[] = [
  SaldosPageComponent,
  SaldosComponent,
  SaldoComponent,
  MovimientosPorCuentaComponent,
  AuxiliarComponent,
  BalanzaPageComponent,
  DiotComponent,
  AuxiliarBancosComponent,
  PagoIsrComponent
];

export * from './saldos-page/saldos-page.component';
export * from './saldos/saldos.component';
export * from './saldo/saldo.component';

export * from './movimientos-por-cuenta/movimientos-por-cuenta.component';
export * from './auxiliar/auxiliar.component';
export * from './balanza/balanza-page.component';

export * from './diot/diot.component';
export * from './auxiliar-bancos/auxiliar-bancos.component';
export * from './pago-isr/pago-isr.component';
