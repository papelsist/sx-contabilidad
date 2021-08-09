import { Action } from '@ngrx/store';

import { CuentaContable, CatalogoFilter } from '../../models';
import { Update } from '@ngrx/entity';

export enum CuentaActionTypes {
  SetCatalogoFilter = '[Cuentas component] Set Catalogo filter',
  LoadCuentas = '[Cuentas Guard] Load Cuentas',
  LoadCuentasSuccess = '[Cuenta API] Load Cuentas Success',
  LoadCuentasFail = '[Cuenta API] Load Cuentas Fail',

  CreateCuenta = '[Cuenta Component] Cuenta create',
  CreateCuentaSuccess = '[Cuenta API] Cuenta create  Success',
  CreateCuentaFail = '[Cuenta API] Cuenta create  Fail',

  DeleteCuenta = '[Cuenta Component] Delete Cuenta',
  DeleteCuentaFail = '[Cuenta API] Delete Cuenta Fail',
  DeleteCuentaSuccess = '[Cuenta API] Delete Cuenta Success',

  UpdateCuenta = '[Cuenta Component] Update Cuenta',
  UpdateCuentaFail = '[Cuenta API] Update Cuenta Fail',
  UpdateCuentaSuccess = '[Cuenta API] Update Cuenta Success',

  SetCuentasSearchTerm = '[Cuentas component] Set cuentas search term',
  UpsertCuenta = '[Cuenta exists guard] Upsert cuenta',
  SetSelectedCuenta = '[Cuentas component]  cuenta'
}

// Set
export class SetCatalogoFilter implements Action {
  readonly type = CuentaActionTypes.SetCatalogoFilter;
  constructor(public payload: {filter: CatalogoFilter}) {}
}

// Load
export class LoadCuentas implements Action {
  readonly type = CuentaActionTypes.LoadCuentas;
  constructor(public payload: {filter: CatalogoFilter}) {}
}
export class LoadCuentasFail implements Action {
  readonly type = CuentaActionTypes.LoadCuentasFail;

  constructor(public payload: { response: any }) {}
}
export class LoadCuentasSuccess implements Action {
  readonly type = CuentaActionTypes.LoadCuentasSuccess;

  constructor(public payload: { cuentas: CuentaContable[] }) {}
}

// Alta
export class CreateCuenta implements Action {
  readonly type = CuentaActionTypes.CreateCuenta;
  constructor(public payload: { cuenta: CuentaContable }) {}
}
export class CreateCuentaFail implements Action {
  readonly type = CuentaActionTypes.CreateCuentaFail;
  constructor(public payload: { response: any }) {}
}
export class CreateCuentaSuccess implements Action {
  readonly type = CuentaActionTypes.CreateCuentaSuccess;
  constructor(public payload: { cuenta: CuentaContable }) {}
}

// Delete
export class DeleteCuenta implements Action {
  readonly type = CuentaActionTypes.DeleteCuenta;

  constructor(public payload: { cuenta: CuentaContable }) {}
}
export class DeleteCuentaFail implements Action {
  readonly type = CuentaActionTypes.DeleteCuentaFail;

  constructor(public payload: { response: any }) {}
}
export class DeleteCuentaSuccess implements Action {
  readonly type = CuentaActionTypes.DeleteCuentaSuccess;

  constructor(public payload: { cuenta: CuentaContable }) {}
}
// Update
export class UpdateCuenta implements Action {
  readonly type = CuentaActionTypes.UpdateCuenta;

  constructor(public payload: { cuenta: Update<CuentaContable> }) {}
}
export class UpdateCuentaFail implements Action {
  readonly type = CuentaActionTypes.UpdateCuentaFail;

  constructor(public payload: { response: any }) {}
}
export class UpdateCuentaSuccess implements Action {
  readonly type = CuentaActionTypes.UpdateCuentaSuccess;

  constructor(public payload: { cuenta: CuentaContable }) {}
}

export class SetCuentasSearchTerm implements Action {
  readonly type = CuentaActionTypes.SetCuentasSearchTerm;
  constructor(public payload: { term: string }) {}
}

export class UpsertCuenta implements Action {
  readonly type = CuentaActionTypes.UpsertCuenta;
  constructor(public payload: { cuenta: CuentaContable }) {}
}

export class SetSelectedCuenta implements Action {
  readonly type = CuentaActionTypes.SetSelectedCuenta;
  constructor(public payload: { selectedId: number }) {}
}

export type CuentaActions =
  | LoadCuentas
  | LoadCuentasFail
  | LoadCuentasSuccess
  | CreateCuenta
  | CreateCuentaFail
  | CreateCuentaSuccess
  | DeleteCuenta
  | DeleteCuentaFail
  | DeleteCuentaSuccess
  | UpdateCuenta
  | UpdateCuentaFail
  | UpdateCuentaSuccess
  | SetCuentasSearchTerm
  | UpsertCuenta
  | SetSelectedCuenta
  | SetCatalogoFilter;
