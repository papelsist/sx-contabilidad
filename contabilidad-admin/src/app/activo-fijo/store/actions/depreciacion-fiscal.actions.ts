import { Action } from '@ngrx/store';
import { DepreciacionFiscal } from 'app/activo-fijo/models/depreciacion-fiscal';

export enum DepreciacionFiscalActionTypes {
  LoadDepreciacionesFiscales = '[Activo Component] Load Depreciaciones fiscales ',
  LoadDepreciacionesFiscalesSuccess = '[Depreciaciones API] Load Depreciaciones fiscales  Success',
  LoadDepreciacionesFiscalesFail = '[Depreciaciones API] Load Depreciaciones fiscales  Fail',

  // Create
  CreateDepreciacionFiscal = '[Activo Component] Create Depreciacion fiscal',
  CreateDepreciacionFiscalFail = '[Depreciaciones Effects] Create Depreciacion fiscal fail',
  CreateDepreciacionFiscalSuccess = '[Depreciaciones Effects] Create Depreciacion fiscal success',

  // Delete
  DeleteDepreciacionFiscal = '[Activo Component] Delete Depreciacion fiscal',
  DeleteDepreciacionFiscalFail = '[Depreciaciones Effects] Delete Depreciacion fiscal fail',
  DeleteDepreciacionFiscalSuccess = '[Depreciaciones Effects] Delete Depreciacion fiscal success',

  CleanDepreciacionesFiscales = '[Activo Component] Clean depreciaciones fiscales'
}

// Load
export class LoadDepreciacionesFiscales implements Action {
  readonly type = DepreciacionFiscalActionTypes.LoadDepreciacionesFiscales;
  constructor(public payload: { actovid: number }) {}
}
export class LoadDepreciacionesFiscalesFail implements Action {
  readonly type = DepreciacionFiscalActionTypes.LoadDepreciacionesFiscalesFail;

  constructor(public payload: { response: any }) {}
}
export class LoadDepreciacionesFiscalesSuccess implements Action {
  readonly type =
    DepreciacionFiscalActionTypes.LoadDepreciacionesFiscalesSuccess;
  constructor(public payload: { depreciaciones: DepreciacionFiscal[] }) {}
}

// Create
export class CreateDepreciacionFiscal implements Action {
  readonly type = DepreciacionFiscalActionTypes.CreateDepreciacionFiscal;
  constructor(
    public payload: { activoId: number; depreciacion: DepreciacionFiscal }
  ) {}
}
export class CreateDepreciacionFiscalFail implements Action {
  readonly type = DepreciacionFiscalActionTypes.CreateDepreciacionFiscalFail;
  constructor(public payload: { response: any }) {}
}
export class CreateDepreciacionFiscalSuccess implements Action {
  readonly type = DepreciacionFiscalActionTypes.CreateDepreciacionFiscalSuccess;
  constructor(public payload: { depreciacion: DepreciacionFiscal }) {}
}

export class CleanDepreciacionesFiscales implements Action {
  readonly type = DepreciacionFiscalActionTypes.CleanDepreciacionesFiscales;
}

// Delete
export class DeleteDepreciacionFiscal implements Action {
  readonly type = DepreciacionFiscalActionTypes.DeleteDepreciacionFiscal;
  constructor(public payload: { activoId: number; deperciacionId: number }) {}
}
export class DeleteDepreciacionFiscalFail implements Action {
  readonly type = DepreciacionFiscalActionTypes.DeleteDepreciacionFiscalFail;
  constructor(public payload: { response: any }) {}
}
export class DeleteDepreciacionFiscalSuccess implements Action {
  readonly type = DepreciacionFiscalActionTypes.DeleteDepreciacionFiscalSuccess;
  constructor(public payload: { deperciacionId: number }) {}
}

export type DepreciacionFiscalActions =
  | LoadDepreciacionesFiscales
  | LoadDepreciacionesFiscalesFail
  | LoadDepreciacionesFiscalesSuccess
  | CreateDepreciacionFiscal
  | CreateDepreciacionFiscalFail
  | CreateDepreciacionFiscalSuccess
  | CleanDepreciacionesFiscales
  | DeleteDepreciacionFiscal
  | DeleteDepreciacionFiscalFail
  | DeleteDepreciacionFiscalSuccess;
