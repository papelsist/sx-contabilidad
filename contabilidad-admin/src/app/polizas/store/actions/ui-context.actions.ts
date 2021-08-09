import { Action } from '@ngrx/store';
import { EjercicioMes } from 'app/models/ejercicio-mes';

export enum UIContextActionTypes {
  SetPeriodoDePoliza = '[Polizas page] Set Periodo de polizas',
  SetMenuContext = '[Polizas page] Set menu de polizas'
}

export class SetPeriodoDePoliza implements Action {
  readonly type = UIContextActionTypes.SetPeriodoDePoliza;
  constructor(public payload: { periodo: EjercicioMes }) {}
}

export class SetMenuContext implements Action {
  readonly type = UIContextActionTypes.SetMenuContext;
  constructor(public payload: { ejercicio: number }) {}
}

export type UIContextActions = SetPeriodoDePoliza | SetMenuContext;
