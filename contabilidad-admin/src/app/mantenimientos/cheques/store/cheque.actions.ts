import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ChequesFilter, Cheque } from '../models/cheque';


export enum ChequeActionTypes {
  SetChequesFilter = '[Cheques Component ] Set Cheques filter',
  SetChequesSearchTerm = '[Cheques Component] Set Cheques term',
  LoadCheques = '[Cheques Guard] Load Cheques',
  LoadChequesFail = '[Cheque API] Load Cheques fail',
  LoadChequesSuccess = '[Cheque API] Load Cheques Success',
  UpsertCheque = '[Cheque Guard] Upsert Cheque',
  UpdateCheque = '[Cheque Component] Update Cheque',
  UpdateChequeFail = '[Cheque API] Update Cheque Fail',
  UpdateChequeSuccess = '[Cheque API] Update Cheque Success'
}

export class SetChequesFilter implements Action {
  readonly type = ChequeActionTypes.SetChequesFilter;
  constructor(public payload: { filter: ChequesFilter }) {}
}

export class SetChequesSearchTerm implements Action {
  readonly type = ChequeActionTypes.SetChequesSearchTerm;
  constructor(public payload: { term: string }) {}
}

export class LoadCheques implements Action {
  readonly type = ChequeActionTypes.LoadCheques;
}
export class LoadChequesFail implements Action {
  readonly type = ChequeActionTypes.LoadChequesFail;
  constructor(public payload: { response: any }) {}
}
export class LoadChequesSuccess implements Action {
  readonly type = ChequeActionTypes.LoadChequesSuccess;

  constructor(public payload: { cheques: Cheque[] }) {}
}

export class UpdateCheque implements Action {
  readonly type = ChequeActionTypes.UpdateCheque;

  constructor(public payload: { cheque: Update<Cheque> }) {}
}
export class UpdateChequeFail implements Action {
  readonly type = ChequeActionTypes.UpdateChequeFail;

  constructor(public payload: { response: any }) {}
}
export class UpdateChequeSuccess implements Action {
  readonly type = ChequeActionTypes.UpdateChequeSuccess;

  constructor(public payload: { cheque: Cheque }) {}
}

export class UpsertCheque implements Action {
  readonly type = ChequeActionTypes.UpsertCheque;

  constructor(public payload: { Cheque: Cheque }) {}
}

export type ChequeActions =
  | SetChequesFilter
  | SetChequesSearchTerm
  | LoadCheques
  | LoadChequesFail
  | LoadChequesSuccess
  | UpdateCheque
  | UpdateChequeFail
  | UpdateChequeSuccess
  | UpsertCheque;
