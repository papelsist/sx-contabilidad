import { Action } from '@ngrx/store';

import { SaldoPorCuentaContable } from '../../models';
import { EjercicioMes } from '../../../models/ejercicio-mes';

export enum SaldosActionTypes {
  SetSaldosPeriodo = '[Saldos page] Set Periodo de saldos',

  LoadSaldos = '[Saldos Guard] Load Saldos',
  LoadSaldosFail = '[Saldos API] Load Saldos Fail',
  LoadSaldosSuccess = '[Saldos API] Load Saldos Success',

  CleanSaldos = '[Saldos ] Load Saldos Success',

  // Actualizar
  ActualizarSaldos = '[Saldos Component] Actualizar Saldos',
  ActualizarSaldosFail = '[Saldos API] Actualizar Saldos Fail',
  ActualizarSaldosSuccess = '[Saldos API] Actualizar Saldos Success',

  // Cierre mensual
  CierreMensual = '[Saldos Component] CierreMensual de Saldos',
  CierreMensualFail = '[Saldos API] CierreMensual de Saldos Fail',
  CierreMensualSuccess = '[Saldos API] CierreMensual de Saldos Success',

  // Cierre anual
  CierreAnual = '[Saldos Component] CierreAnual de Saldos',
  CierreAnualFail = '[Saldos API] CierreAnual de Saldos Fail',
  CierreAnualSuccess = '[Saldos API] CierreAnual de Saldos Success',

  // Updsert saldo
  UpsertSaldo = '[Saldo exists guard] Upsert saldo'
}

export class SetSaldosPeriodo implements Action {
  readonly type = SaldosActionTypes.SetSaldosPeriodo;
  constructor(public payload: { periodo: EjercicioMes }) {}
}

// Load
export class LoadSaldos implements Action {
  readonly type = SaldosActionTypes.LoadSaldos;
}
export class LoadSaldosFail implements Action {
  readonly type = SaldosActionTypes.LoadSaldosFail;

  constructor(public payload: { response: any }) {}
}
export class LoadSaldosSuccess implements Action {
  readonly type = SaldosActionTypes.LoadSaldosSuccess;
  constructor(public payload: { saldos: SaldoPorCuentaContable[] }) {}
}

// Actualizar
export class ActualizarSaldos implements Action {
  readonly type = SaldosActionTypes.ActualizarSaldos;
  constructor() {}
}
export class ActualizarSaldosFail implements Action {
  readonly type = SaldosActionTypes.ActualizarSaldosFail;
  constructor(public payload: { response: any }) {}
}
export class ActualizarSaldosSuccess implements Action {
  readonly type = SaldosActionTypes.ActualizarSaldosSuccess;
  constructor(public payload: { saldos: SaldoPorCuentaContable[] }) {}
}

// Cierre mensual
export class CierreMensual implements Action {
  readonly type = SaldosActionTypes.CierreMensual;
  constructor() {}
}
export class CierreMensualFail implements Action {
  readonly type = SaldosActionTypes.CierreMensualFail;
  constructor(public payload: { response: any }) {}
}
export class CierreMensualSuccess implements Action {
  readonly type = SaldosActionTypes.CierreMensualSuccess;
}

// Cierre anual
export class CierreAnual implements Action {
  readonly type = SaldosActionTypes.CierreAnual;
  constructor() {}
}
export class CierreAnualFail implements Action {
  readonly type = SaldosActionTypes.CierreAnualFail;
  constructor(public payload: { response: any }) {}
}
export class CierreAnualSuccess implements Action {
  readonly type = SaldosActionTypes.CierreAnualSuccess;
}

export class UpsertSaldo implements Action {
  readonly type = SaldosActionTypes.UpsertSaldo;
  constructor(public payload: { saldo: SaldoPorCuentaContable }) {}
}

export type SaldosActions =
  | SetSaldosPeriodo
  | LoadSaldos
  | LoadSaldosFail
  | LoadSaldosSuccess
  | ActualizarSaldos
  | ActualizarSaldosFail
  | ActualizarSaldosSuccess
  | CierreMensual
  | CierreMensualFail
  | CierreMensualSuccess
  | CierreAnual
  | CierreAnualFail
  | CierreAnualSuccess
  | UpsertSaldo;
