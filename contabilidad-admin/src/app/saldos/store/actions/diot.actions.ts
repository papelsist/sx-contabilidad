import { Action } from '@ngrx/store';

import { Diot } from '../../models';
import { EjercicioMes } from '../../../models/ejercicio-mes';

export enum DiotActionTypes {
  LoadDiot = '[Diot Component] Load DIOT',
  LoadDiotSuccess = '[Diot API] Load DIOT Success',
  LoadDiotFail = '[Diot API] Load DIOT Fail',
  // Genera
  GenerarDiot = '[Diot Component] Generar DIOT',
  GenerarDiotSuccess = '[Diot API] Generar DIOT Success',
  GenerarDiotFail = '[Diot API] Generar DIOT Fail',
  // Genera archivo
  GenerarArchivoDiot = '[Diot Component] GenerarArchivo DIOT',
  GenerarArchivoDiotSuccess = '[Diot API] GenerarArchivo DIOT Success',
  GenerarArchivoDiotFail = '[Diot API] GenerarArchivo DIOT Fail'
}

// Load
export class LoadDiot implements Action {
  readonly type = DiotActionTypes.LoadDiot;
  constructor(public payload: { periodo: EjercicioMes }) {}
}
export class LoadDiotFail implements Action {
  readonly type = DiotActionTypes.LoadDiotFail;

  constructor(public payload: { response: any }) {}
}
export class LoadDiotSuccess implements Action {
  readonly type = DiotActionTypes.LoadDiotSuccess;
  constructor(public payload: { rows: Diot[] }) {}
}

// Generar
export class GenerarDiot implements Action {
  readonly type = DiotActionTypes.GenerarDiot;
  constructor(public payload: { periodo: EjercicioMes }) {}
}
export class GenerarDiotFail implements Action {
  readonly type = DiotActionTypes.GenerarDiotFail;

  constructor(public payload: { response: any }) {}
}
export class GenerarDiotSuccess implements Action {
  readonly type = DiotActionTypes.GenerarDiotSuccess;
  constructor(public payload: { rows: Diot[] }) {}
}

// Generar archivo
export class GenerarArchivoDiot implements Action {
  readonly type = DiotActionTypes.GenerarArchivoDiot;
  constructor(public payload: { periodo: EjercicioMes }) {}
}
export class GenerarArchivoDiotFail implements Action {
  readonly type = DiotActionTypes.GenerarArchivoDiotFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarArchivoDiotSuccess implements Action {
  readonly type = DiotActionTypes.GenerarArchivoDiotSuccess;
}

export type DiotActions =
  | LoadDiot
  | LoadDiotFail
  | LoadDiotSuccess
  | GenerarDiot
  | GenerarDiotFail
  | GenerarDiotSuccess
  | GenerarArchivoDiot
  | GenerarArchivoDiotFail
  | GenerarArchivoDiotSuccess;
