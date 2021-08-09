import { Action } from '@ngrx/store';
import { AjusteAnual } from '../../model';

export enum AjusteAnualActionTypes {
  LoadAjustes = '[Ajustes component] Load ajustes',
  LoadAjustesFail = '[Ajustes component] Load ajustes fail',
  LoadAjustesSuccess = '[Ajustes component] Load ajustes success',

  GenerarAjustes = '[Ajustes component] Generar ajustes',
  GenerarAjustesFail = '[Ajustes component] Generar ajustes fail',
  GenerarAjustesSuccess = '[Ajustes component] Generar ajustes success'
}

export class LoadAjustes implements Action {
  readonly type = AjusteAnualActionTypes.LoadAjustes;
  constructor(public payload: { ejercicio: number }) {}
}
export class LoadAjustesFail implements Action {
  readonly type = AjusteAnualActionTypes.LoadAjustesFail;
  constructor(public payload: { response: any }) {}
}
export class LoadAjustesSuccess implements Action {
  readonly type = AjusteAnualActionTypes.LoadAjustesSuccess;
  constructor(public payload: { ajus: AjusteAnual[] }) {}
}

export class GenerarAjustes implements Action {
  readonly type = AjusteAnualActionTypes.GenerarAjustes;
  constructor(public payload: { ejercicio: number; mes: number }) {}
}
export class GenerarAjustesFail implements Action {
  readonly type = AjusteAnualActionTypes.GenerarAjustesFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarAjustesSuccess implements Action {
  readonly type = AjusteAnualActionTypes.GenerarAjustesSuccess;
  constructor(public payload: { ajus: AjusteAnual[] }) {}
}

export type AjusteAnualActions =
  | LoadAjustes
  | LoadAjustesFail
  | LoadAjustesSuccess
  | GenerarAjustes
  | GenerarAjustesFail
  | GenerarAjustesSuccess;
