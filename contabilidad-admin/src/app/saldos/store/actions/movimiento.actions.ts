import { Action } from '@ngrx/store';

import { Periodo } from 'app/_core/models/periodo';
import { CuentaContable } from 'app/cuentas/models';
import { PolizaDet } from 'app/polizas/models';

export const enum MovimientoActionTypes {
  LoadMovimientosPorCuenta = '[Movimientos por cuenta] Load movimientos por cuenta',
  LoadMovimientosPorCuentaFail = '[Movimientos por cuenta API] Load movimientos por cuenta fail',
  LoadMovimientosPorCuentaSuccess = '[Movimientos por cuenta API] Load movimientos por cuenta success',
  // Reclasificacicion BATCH
  ReclasificarMovimientos = '[Saldos Component] Reclasificar movimientos',
  ReclasificarMovimientosFail = '[Saldos API] Reclasificar movimientos fail',
  ReclasificarMovimientosSuccess = '[Saldos API] Reclasificar movimientos success'
}

export class LoadMovimientosPorCuenta implements Action {
  readonly type = MovimientoActionTypes.LoadMovimientosPorCuenta;
  constructor(
    public payload: { cuenta: Partial<CuentaContable>; periodo: Periodo }
  ) {}
}
export class LoadMovimientosPorCuentaFail implements Action {
  readonly type = MovimientoActionTypes.LoadMovimientosPorCuentaFail;
  constructor(public payload: { response: any }) {}
}
export class LoadMovimientosPorCuentaSuccess implements Action {
  readonly type = MovimientoActionTypes.LoadMovimientosPorCuentaSuccess;
  constructor(public payload: { movimientos: PolizaDet[] }) {}
}

// Reclasificar movimientos
export class ReclasificarMovimientos implements Action {
  readonly type = MovimientoActionTypes.ReclasificarMovimientos;
  constructor(public payload: { cuenta: number; partidas: any[] }) {}
}
export class ReclasificarMovimientosFail implements Action {
  readonly type = MovimientoActionTypes.ReclasificarMovimientosFail;
  constructor(public payload: { response: any }) {}
}
export class ReclasificarMovimientosSuccess implements Action {
  readonly type = MovimientoActionTypes.ReclasificarMovimientosSuccess;
}

export type MovimientosActions =
  | LoadMovimientosPorCuenta
  | LoadMovimientosPorCuentaFail
  | LoadMovimientosPorCuentaSuccess
  | ReclasificarMovimientos
  | ReclasificarMovimientosFail
  | ReclasificarMovimientosSuccess;
