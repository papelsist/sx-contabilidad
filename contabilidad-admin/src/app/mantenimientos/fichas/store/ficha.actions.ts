import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Ficha } from '../models/ficha';

export enum FichaActionTypes {
  SetFichasFilter = '[Fichas Component ] Set Fichas filter',
  LoadFichas = '[Fichas Guard] Load Fichas',
  LoadFichasFail = '[Fichas API] Load Fichas Fail',
  LoadFichasSuccess = '[Fichas API] Load Fichas Success',

  UpdateFicha = '[Fichas component] Update ficha',
  UpdateFichaFail = '[Fichas API] Update ficha fail',
  UpdateFichaSuccess = '[Fichas API] Update ficha success'
}

export class SetFichasFilter implements Action {
  readonly type = FichaActionTypes.SetFichasFilter;
  constructor(public payload: { filter: any }) {}
}
// Load actions
export class LoadFichas implements Action {
  readonly type = FichaActionTypes.LoadFichas;
}
export class LoadFichasFail implements Action {
  readonly type = FichaActionTypes.LoadFichasFail;
  constructor(public payload: { response: any }) {}
}
export class LoadFichasSuccess implements Action {
  readonly type = FichaActionTypes.LoadFichasSuccess;

  constructor(public payload: { fichas: Ficha[] }) {}
}

// Update fichas
export class UpdateFicha implements Action {
  readonly type = FichaActionTypes.UpdateFicha;
  constructor(public payload: { update: Update<Ficha> }) {}
}
export class UpdateFichaFial implements Action {
  readonly type = FichaActionTypes.UpdateFichaFail;
  constructor(public payload: { response: any }) {}
}
export class UpdateFichasSuccess implements Action {
  readonly type = FichaActionTypes.UpdateFichaSuccess;

  constructor(public payload: { ficha: Ficha }) {}
}

export type FichaActions =
  | SetFichasFilter
  | LoadFichas
  | LoadFichasFail
  | LoadFichasSuccess
  | UpdateFicha
  | UpdateFichaFial
  | UpdateFichasSuccess;
