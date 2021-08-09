import { Action } from '@ngrx/store';

import { SaldoPorCuentaContable } from '../../models';
import { EjercicioMes } from '../../../models/ejercicio-mes';

export enum BalanzaActionTypes {
  LoadBalanza = '[Balanza Component] Load Balanza',
  LoadBalanzaFail = '[Balanza API] Load Balanza Fail',
  LoadBalanzaSuccess = '[Balanza API] Load Balanza Success'
}

// Load
export class LoadBalanza implements Action {
  readonly type = BalanzaActionTypes.LoadBalanza;
  constructor(public payload: { periodo: EjercicioMes }) {}
}
export class LoadBalanzaFail implements Action {
  readonly type = BalanzaActionTypes.LoadBalanzaFail;

  constructor(public payload: { response: any }) {}
}
export class LoadBalanzaSuccess implements Action {
  readonly type = BalanzaActionTypes.LoadBalanzaSuccess;
  constructor(public payload: { saldos: SaldoPorCuentaContable[] }) {}
}

export type BalanzaActions = LoadBalanza | LoadBalanzaFail | LoadBalanzaSuccess;
