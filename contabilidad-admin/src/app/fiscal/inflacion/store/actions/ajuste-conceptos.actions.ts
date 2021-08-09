import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { AjusteConcepto } from '../../model';

export enum AjusteConceptoActionTypes {
  LoadConceptos = '[Ajuste Conceptos component] Load Conceptos',
  LoadConceptosFail = '[Ajuste Conceptos component] Load Conceptos fail',
  LoadConceptosSuccess = '[Ajuste Conceptos component] Load Conceptos success',

  CreateConcepto = '[Concepto component] Create concepto',
  CreateConceptoFail = '[Concepto component] Create concepto fail',
  CreateConceptoSuccess = '[Concepto component] Create concepto success',

  UpdateConcepto = '[Concepto component] Update concepto',
  UpdateConceptoFail = '[Concepto component] Update concepto fail',
  UpdateConceptoSuccess = '[Concepto component] Update concepto success',

  DeleteConcepto = '[Concepto component] Delete concepto',
  DeleteConceptoFail = '[Concepto component] Delete concepto fail',
  DeleteConceptoSuccess = '[Concepto component] Delete concepto success'
}

export class LoadConceptos implements Action {
  readonly type = AjusteConceptoActionTypes.LoadConceptos;
}
export class LoadConceptosFail implements Action {
  readonly type = AjusteConceptoActionTypes.LoadConceptosFail;
  constructor(public payload: { response: any }) {}
}
export class LoadConceptosSuccess implements Action {
  readonly type = AjusteConceptoActionTypes.LoadConceptosSuccess;
  constructor(public payload: { conceptos: AjusteConcepto[] }) {}
}

export class CreateConcepto implements Action {
  readonly type = AjusteConceptoActionTypes.CreateConcepto;
  constructor(public payload: { concepto: Partial<AjusteConcepto> }) {}
}
export class CreateConceptoFail implements Action {
  readonly type = AjusteConceptoActionTypes.CreateConceptoFail;
  constructor(public payload: { response: any }) {}
}
export class CreateConceptoSuccess implements Action {
  readonly type = AjusteConceptoActionTypes.CreateConceptoSuccess;
  constructor(public payload: { concepto: AjusteConcepto }) {}
}

export class UpdateConcepto implements Action {
  readonly type = AjusteConceptoActionTypes.UpdateConcepto;
  constructor(public payload: { concepto: Update<AjusteConcepto> }) {}
}
export class UpdateConceptoFail implements Action {
  readonly type = AjusteConceptoActionTypes.UpdateConceptoFail;
  constructor(public payload: { response: any }) {}
}
export class UpdateConceptoSuccess implements Action {
  readonly type = AjusteConceptoActionTypes.UpdateConceptoSuccess;
  constructor(public payload: { concepto: AjusteConcepto }) {}
}

export class DeleteConcepto implements Action {
  readonly type = AjusteConceptoActionTypes.DeleteConcepto;
  constructor(public payload: { conceptoId: number }) {}
}
export class DeleteConceptoFail implements Action {
  readonly type = AjusteConceptoActionTypes.DeleteConceptoFail;
  constructor(public payload: { response: any }) {}
}
export class DeleteConceptoSuccess implements Action {
  readonly type = AjusteConceptoActionTypes.DeleteConceptoSuccess;
  constructor(public payload: { conceptoId: number }) {}
}

export type AjusteConceptoActions =
  | LoadConceptos
  | LoadConceptosFail
  | LoadConceptosSuccess
  | CreateConcepto
  | CreateConceptoFail
  | CreateConceptoSuccess
  | UpdateConcepto
  | UpdateConceptoFail
  | UpdateConceptoSuccess
  | DeleteConcepto
  | DeleteConceptoFail
  | DeleteConceptoSuccess;
