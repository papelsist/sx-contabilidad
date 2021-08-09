import { Action } from '@ngrx/store';

import { PolizasPeriodo } from '../../models';

export enum PolizasPeriodoActionTypes {
  LoadPolizasPeriodo = '[PolizasPeriodo Guard] Load Load PolizasPeriodo',
  LoadPolizasPeriodoSuccess = '[PolizasPeriodo API] Load PolizasPeriodo Success',
  LoadPolizasPeriodoFail = '[PolizasPeriodo API] Load PolizasPeriodo Fail',

  GenerarPolizasPeriodo = '[PolizasPeriodo component] Generar polizas periodo',
  GenerarPolizasPeriodoFail = '[PolizasPeriodo API] Generar polizas periodo fail',
  GenerarPolizasPeriodoSuccess = '[PolizasPeriodo API] Generar polizas periodo success',

  UpsertPolizasPeriodo = '[PolizasPeriodo API] Upsert polizas periodo',
  MostrarPolizasPeriodoXml = '[PolizasPeriodo component] Mostrar polizas periodo XML',
  DescargarPolizasPeriodoXml = '[PolizasPeriodo component] Descargar polizas periodo XML',

  // Delete poliza del periodo
  DeletePolizasPeriodo = '[PolizasPeriodo component] Delete polizas periodo',
  DeletePolizasPeriodoFail = '[PolizasPeriodo API] Delete polizas periodo fail',
  DeletePolizasPeriodoSuccess = '[PolizasPeriodo API] Delete polizas periodo success'
}

// Load polizasPeriodos
export class LoadPolizasPeriodo implements Action {
  readonly type = PolizasPeriodoActionTypes.LoadPolizasPeriodo;
}
export class LoadPolizasPeriodoFail implements Action {
  readonly type = PolizasPeriodoActionTypes.LoadPolizasPeriodoFail;

  constructor(public payload: { response: any }) {}
}
export class LoadPolizasPeriodoSuccess implements Action {
  readonly type = PolizasPeriodoActionTypes.LoadPolizasPeriodoSuccess;
  constructor(public payload: { polizasPeriodo: PolizasPeriodo[] }) {}
}

export class GenerarPolizasPeriodo implements Action {
  readonly type = PolizasPeriodoActionTypes.GenerarPolizasPeriodo;
  constructor(public payload: { polizasPeriodo: Partial<PolizasPeriodo> }) {}
}
export class GenerarPolizasPeriodoFail implements Action {
  readonly type = PolizasPeriodoActionTypes.GenerarPolizasPeriodoFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarPolizasPeriodoSuccess implements Action {
  readonly type = PolizasPeriodoActionTypes.GenerarPolizasPeriodoSuccess;
  constructor(public payload: { polizasPeriodo: PolizasPeriodo }) {}
}

export class UpsertPolizasPeriodo implements Action {
  readonly type = PolizasPeriodoActionTypes.UpsertPolizasPeriodo;
  constructor(public payload: { polizasPeriodo: PolizasPeriodo }) {}
}

export class MostrarPolizasPeriodoXml implements Action {
  readonly type = PolizasPeriodoActionTypes.MostrarPolizasPeriodoXml;

  constructor(public payload: { polizasPeriodo: Partial<PolizasPeriodo> }) {}
}

export class DescargarPolizasPeriodoXml implements Action {
  readonly type = PolizasPeriodoActionTypes.DescargarPolizasPeriodoXml;

  constructor(public payload: { polizasPeriodo: Partial<PolizasPeriodo> }) {}
}

// Delete
export class DeletePolizasPeriodo implements Action {
  readonly type = PolizasPeriodoActionTypes.DeletePolizasPeriodo;
  constructor(public payload: { polizaPeriodo: Partial<PolizasPeriodo> }) {}
}
export class DeletePolizasPeriodoFail implements Action {
  readonly type = PolizasPeriodoActionTypes.DeletePolizasPeriodoFail;
  constructor(public payload: { response: any }) {}
}
export class DeletePolizasPeriodoSuccess implements Action {
  readonly type = PolizasPeriodoActionTypes.DeletePolizasPeriodoSuccess;
  constructor(public payload: { polizasPeriodo: Partial<PolizasPeriodo> }) {}
}

export type PolizasPeriodoActions =
  | LoadPolizasPeriodo
  | LoadPolizasPeriodoFail
  | LoadPolizasPeriodoSuccess
  | GenerarPolizasPeriodo
  | GenerarPolizasPeriodoFail
  | GenerarPolizasPeriodoSuccess
  | UpsertPolizasPeriodo
  | MostrarPolizasPeriodoXml
  | DescargarPolizasPeriodoXml
  | DeletePolizasPeriodo
  | DeletePolizasPeriodoFail
  | DeletePolizasPeriodoSuccess;
