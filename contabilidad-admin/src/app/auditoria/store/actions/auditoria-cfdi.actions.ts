import { Action } from '@ngrx/store';
import { AuditoriaFiscalCfdi } from 'app/auditoria/models';

export enum AuditoriaCfdiActionTypes {
  SetAuditoriaCfdiFilter = '[AuditoriaCfdi Page] Set metadata filter',
  LoadAuditoriaCfdi = '[AuditoriaCfdi Page] Load AuditoriaCfdi',
  LoadAuditoriaCfdiFail = '[AuditoriaCfdi API] Load AuditoriaCfdi fail',
  LoadAuditoriaCfdiSuccess = '[AuditoriaCfdi API] Load AuditoriaCfdi success',

  GenerarAuditoriaCfdi = '[AuditoriaCfdi Page] Generar AuditoriaCfdi',
  GenerarAuditoriaCfdiFail = '[AuditoriaCfdi API] Generar AuditoriaCfdi fail',
  GenerarAuditoriaCfdiSuccess = '[AuditoriaCfdi API] Generar AuditoriaCfdi success'
}

export class SetAuditoriaCfdiFilter implements Action {
  readonly type = AuditoriaCfdiActionTypes.SetAuditoriaCfdiFilter;
  constructor(public payload: { filter: any }) {}
}

export class LoadAuditoriaCfdi implements Action {
  readonly type = AuditoriaCfdiActionTypes.LoadAuditoriaCfdi;
  constructor(public payload: { filter: any }) {}
}
export class LoadAuditoriaCfdiFail implements Action {
  readonly type = AuditoriaCfdiActionTypes.LoadAuditoriaCfdiFail;
  constructor(public payload: { response: any }) {}
}
export class LoadAuditoriaCfdiSuccess implements Action {
  readonly type = AuditoriaCfdiActionTypes.LoadAuditoriaCfdiSuccess;
  constructor(public payload: { data: AuditoriaFiscalCfdi[] }) {}
}

export class GenerarAuditoriaCfdi implements Action {
  readonly type = AuditoriaCfdiActionTypes.GenerarAuditoriaCfdi;
  constructor(public payload: { filter: any }) {}
}
export class GenerarAuditoriaCfdiFail implements Action {
  readonly type = AuditoriaCfdiActionTypes.GenerarAuditoriaCfdiFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarAuditoriaCfdiSuccess implements Action {
  readonly type = AuditoriaCfdiActionTypes.GenerarAuditoriaCfdiSuccess;
  constructor(public payload: { data: AuditoriaFiscalCfdi[] }) {}
}

export type AuditoriaCfdiActions =
  | SetAuditoriaCfdiFilter
  | LoadAuditoriaCfdi
  | LoadAuditoriaCfdiFail
  | LoadAuditoriaCfdiSuccess
  | GenerarAuditoriaCfdi
  | GenerarAuditoriaCfdiFail
  | GenerarAuditoriaCfdiSuccess;
