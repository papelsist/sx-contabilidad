import { Action } from '@ngrx/store';

import { Depreciacion } from 'app/activo-fijo/models/depreciacion';

export enum DepreciacionActionTypes {
  LoadDepreciaciones = '[Activo Component] Load Depreciaciones ',
  LoadDepreciacionesSuccess = '[Depreciaciones API] Load Depreciaciones  Success',
  LoadDepreciacionesFail = '[Depreciaciones API] Load Depreciaciones  Fail',

  // Create
  CreateDepreciacion = '[Activo Component] Create Depreciacion',
  CreateDepreciacionFail = '[Depreciaciones Effects] Create Depreciacion fail',
  CreateDepreciacionSuccess = '[Depreciaciones Effects] Create Depreciacion success',

  // Delete
  DeleteDepreciacion = '[Activo Component] Delete Depreciacion',
  DeleteDepreciacionFail = '[Depreciaciones Effects] Delete Depreciacion fail',
  DeleteDepreciacionSuccess = '[Depreciaciones Effects] Delete Depreciacion success',

  CleanDepreciaciones = '[Activo Component] Clean depreciaciones'
}

// Load
export class LoadDepreciaciones implements Action {
  readonly type = DepreciacionActionTypes.LoadDepreciaciones;
  constructor(public payload: { actovid: number }) {}
}
export class LoadDepreciacionesFail implements Action {
  readonly type = DepreciacionActionTypes.LoadDepreciacionesFail;

  constructor(public payload: { response: any }) {}
}
export class LoadDepreciacionesSuccess implements Action {
  readonly type = DepreciacionActionTypes.LoadDepreciacionesSuccess;
  constructor(public payload: { depreciaciones: Depreciacion[] }) {}
}

// Create
export class CreateDepreciacion implements Action {
  readonly type = DepreciacionActionTypes.CreateDepreciacion;
  constructor(public payload: { activoId: number; corte: Date }) {}
}
export class CreateDepreciacionFail implements Action {
  readonly type = DepreciacionActionTypes.CreateDepreciacionFail;
  constructor(public payload: { response: any }) {}
}
export class CreateDepreciacionSuccess implements Action {
  readonly type = DepreciacionActionTypes.CreateDepreciacionSuccess;
  constructor(public payload: { depreciacion: Depreciacion }) {}
}

export class CleanDepreciaciones implements Action {
  readonly type = DepreciacionActionTypes.CleanDepreciaciones;
}

// Delete
export class DeleteDepreciacion implements Action {
  readonly type = DepreciacionActionTypes.DeleteDepreciacion;
  constructor(public payload: { activoId: number; deperciacionId: number }) {}
}
export class DeleteDepreciacionFail implements Action {
  readonly type = DepreciacionActionTypes.DeleteDepreciacionFail;
  constructor(public payload: { response: any }) {}
}
export class DeleteDepreciacionSuccess implements Action {
  readonly type = DepreciacionActionTypes.DeleteDepreciacionSuccess;
  constructor(public payload: { deperciacionId: number }) {}
}

export type DepreciacionesActions =
  | LoadDepreciaciones
  | LoadDepreciacionesFail
  | LoadDepreciacionesSuccess
  | CreateDepreciacion
  | CreateDepreciacionFail
  | CreateDepreciacionSuccess
  | CleanDepreciaciones
  | DeleteDepreciacion
  | DeleteDepreciacionFail
  | DeleteDepreciacionSuccess;
