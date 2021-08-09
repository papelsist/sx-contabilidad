import { Action } from '@ngrx/store';

import { Periodo } from 'app/_core/models/periodo';
import { Auxiliar } from 'app/saldos/models/auxiliar';
import { CuentaContable } from 'app/cuentas/models';

export const enum AuxiliarActionTypes {
  LoadAuxiliar = '[Auxiliar  component] Load auxiliar contable',
  LoadAuxiliarFail = '[Auxiliarta API] Load auxiliar  contable fail',
  LoadAuxiliarSuccess = '[Auxiliarta API] Load auxiliar contable success',
  // Bancos
  LoadAuxiliarDeBancos = '[Auxiliar de Bancos component] Load auxiliar de bancos ',
  LoadAuxiliarDeBancosFail = '[Auxiliarta API] Load auxiliar de bancos  fail',
  LoadAuxiliarDeBancosSuccess = '[Auxiliarta API] Load auxiliar de bancos success',

  CleanAuxiliar = '[Auxiliares  y Auxiliarde bancos component] Clean auxiliar'
}

export class LoadAuxiliar implements Action {
  readonly type = AuxiliarActionTypes.LoadAuxiliar;
  constructor(
    public payload: {
      cuentaInicial: string;
      cuentaFinal?: string
      periodo: Periodo;
    }
  ) {}
}

export class LoadAuxiliarFail implements Action {
  readonly type = AuxiliarActionTypes.LoadAuxiliarFail;
  constructor(public payload: { response: any }) {}
}
export class LoadAuxiliarSuccess implements Action {
  readonly type = AuxiliarActionTypes.LoadAuxiliarSuccess;
  constructor(public payload: { movimientos: Auxiliar[] }) {}
}

// Bancos
export class LoadAuxiliarDeBancos implements Action {
  readonly type = AuxiliarActionTypes.LoadAuxiliarDeBancos;
  constructor(
    public payload: {
      cuentaId: number;
      periodo: Periodo;
    }
  ) {}
}
export class LoadAuxiliarDeBancosFail implements Action {
  readonly type = AuxiliarActionTypes.LoadAuxiliarDeBancosFail;
  constructor(public payload: { response: any }) {}
}
export class LoadAuxiliarDeBancosSuccess implements Action {
  readonly type = AuxiliarActionTypes.LoadAuxiliarDeBancosSuccess;
  constructor(public payload: { movimientos: Auxiliar[] }) {}
}

export class CleanAuxiliar implements Action {
  readonly type = AuxiliarActionTypes.CleanAuxiliar;
}

export type AuxiliarActions =
  | LoadAuxiliar
  | LoadAuxiliarFail
  | LoadAuxiliarSuccess
  | LoadAuxiliarDeBancos
  | LoadAuxiliarDeBancosFail
  | LoadAuxiliarDeBancosSuccess
  | CleanAuxiliar;
