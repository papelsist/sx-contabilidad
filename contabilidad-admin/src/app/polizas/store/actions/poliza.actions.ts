import { Action } from '@ngrx/store';

import { Poliza, PolizasFilter } from '../../models';
import { Update } from '@ngrx/entity';

export enum PolizaActionTypes {
  SetPolizasFilter = '[Polizas component] Set Catalogo filter',
  LoadPolizas = '[Polizas Guard] Load Polizas',
  LoadPolizasSuccess = '[Poliza API] Load Polizas Success',
  LoadPolizasFail = '[Poliza API] Load Polizas Fail',

  CreatePoliza = '[Poliza Component] Poliza create',
  CreatePolizaSuccess = '[Poliza API] Poliza create  Success',
  CreatePolizaFail = '[Poliza API] Poliza create  Fail',

  // Generar polizas (Batch)
  GenerarPolizas = '[Poliza Component] Generar polizas ',
  GenerarPolizasSuccess = '[Poliza API] Generar Polizas Success',
  GenerarPolizasFail = '[Poliza API] Generar Polizas  Fail',

  // Egresos
  CreatePolizasEgreso = '[Poliza Component] Create polizas  egreso',
  CreatePolizasEgresoSuccess = '[Poliza API] Create Polizas egreso Success',
  CreatePolizasEgresoFail = '[Poliza API] Create Polizas  egreso Fail',

  DeletePoliza = '[Poliza Component] Delete Poliza',
  DeletePolizaFail = '[Poliza API] Delete Poliza Fail',
  DeletePolizaSuccess = '[Poliza API] Delete Poliza Success',

  UpdatePoliza = '[Poliza Component] Update Poliza',
  UpdatePolizaFail = '[Poliza API] Update Poliza Fail',
  UpdatePolizaSuccess = '[Poliza API] Update Poliza Success',

  // Recalcular
  RecalcularPoliza = '[Poliza Component] Recalcular Poliza',
  RecalcularPolizaFail = '[Poliza API] Recalcular Poliza Fail',
  RecalcularPolizaSuccess = '[Poliza API] Recalcular Poliza Success',

  // Cerrar
  CerrarPoliza = '[Poliza Component] Cerrar Poliza',
  CerrarPolizaFail = '[Poliza API] Cerrar Poliza Fail',
  CerrarPolizaSuccess = '[Poliza API] Cerrar Poliza Success',

  UpsertPoliza = '[Poliza exists guard] Upsert poliza',
  SetPolizasSearchTerm = '[Polizas component] Set polizas search term',

  // Refoliar
  GenerarFolios = '[Polizas Component] Generar Folios',
  GenerarFoliosFail = '[Polizas API] Generar Folios Fail',
  GenerarFoliosSuccess = '[Polizas API] Generar Folios Success',

  // Generar complementos
  GenerarComplementos = '[Poliza Component] GenerarComplementos Poliza',
  GenerarComplementosFail = '[Poliza API] GenerarComplementos Poliza Fail',

  // Prorratear
  ProrratearPartida = '[Polizas Component] ProrratearPartidas',
  ProrratearPartidaFail = '[Polizas API] ProrratearPartidas Fail',
  ProrratearPartidaSuccess = '[Polizas API] ProrratearPartidas Success',

  CopiarPoliza = '[Poliza Component] Copiar poliza ',
  CopiarPolizaSuccess = '[Poliza API] Copiar poliza  Success',
  CopiarPolizaFail = '[Poliza API] Copiar poliza  Fail'
}

// Set
export class SetPolizasFilter implements Action {
  readonly type = PolizaActionTypes.SetPolizasFilter;
  constructor(public payload: { filter: PolizasFilter }) {}
}
export class SetPolizasSearchTerm implements Action {
  readonly type = PolizaActionTypes.SetPolizasSearchTerm;
  constructor(public payload: { term: string }) {}
}

// Load
export class LoadPolizas implements Action {
  readonly type = PolizaActionTypes.LoadPolizas;
  constructor(public payload: { filter: PolizasFilter }) {}
}
export class LoadPolizasFail implements Action {
  readonly type = PolizaActionTypes.LoadPolizasFail;

  constructor(public payload: { response: any }) {}
}
export class LoadPolizasSuccess implements Action {
  readonly type = PolizaActionTypes.LoadPolizasSuccess;

  constructor(public payload: { polizas: Poliza[] }) {}
}

// Alta
export class CreatePoliza implements Action {
  readonly type = PolizaActionTypes.CreatePoliza;
  constructor(public payload: { poliza: Poliza }) {}
}
export class CreatePolizaFail implements Action {
  readonly type = PolizaActionTypes.CreatePolizaFail;
  constructor(public payload: { response: any }) {}
}
export class CreatePolizaSuccess implements Action {
  readonly type = PolizaActionTypes.CreatePolizaSuccess;
  constructor(public payload: { poliza: Poliza }) {}
}

// Alta de egresos
export class CreatePolizasEgreso implements Action {
  readonly type = PolizaActionTypes.CreatePolizasEgreso;
  constructor(public payload: { filter: PolizasFilter }) {}
}
export class CreatePolizasEgresoFail implements Action {
  readonly type = PolizaActionTypes.CreatePolizasEgresoFail;
  constructor(public payload: { response: any }) {}
}
export class CreatePolizasEgresoSuccess implements Action {
  readonly type = PolizaActionTypes.CreatePolizasEgresoSuccess;
  constructor(public payload: { polizas: Poliza[] }) {}
}

// Generar polizas (BATCH)
export class GenerarPolizas implements Action {
  readonly type = PolizaActionTypes.GenerarPolizas;
  constructor(public payload: { filter: PolizasFilter }) {}
}
export class GenerarPolizasFail implements Action {
  readonly type = PolizaActionTypes.GenerarPolizasFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarPolizasSuccess implements Action {
  readonly type = PolizaActionTypes.GenerarPolizasSuccess;
  constructor(public payload: { polizas: Poliza[] }) {}
}

// Delete
export class DeletePoliza implements Action {
  readonly type = PolizaActionTypes.DeletePoliza;

  constructor(public payload: { poliza: Poliza }) {}
}
export class DeletePolizaFail implements Action {
  readonly type = PolizaActionTypes.DeletePolizaFail;

  constructor(public payload: { response: any }) {}
}
export class DeletePolizaSuccess implements Action {
  readonly type = PolizaActionTypes.DeletePolizaSuccess;

  constructor(public payload: { poliza: Poliza }) {}
}

// Recalcular
export class RecalcularPoliza implements Action {
  readonly type = PolizaActionTypes.RecalcularPoliza;
  constructor(public payload: { polizaId: number }) {}
}
export class RecalcularPolizaFail implements Action {
  readonly type = PolizaActionTypes.RecalcularPolizaFail;
  constructor(public payload: { response: any }) {}
}
export class RecalcularPolizaSuccess implements Action {
  readonly type = PolizaActionTypes.RecalcularPolizaSuccess;
  constructor(public payload: { poliza: Poliza }) {}
}

// Cerrar
export class CerrarPoliza implements Action {
  readonly type = PolizaActionTypes.CerrarPoliza;
  constructor(public payload: { polizaId: number }) {}
}
export class CerrarPolizaFail implements Action {
  readonly type = PolizaActionTypes.CerrarPolizaFail;
  constructor(public payload: { response: any }) {}
}
export class CerrarPolizaSuccess implements Action {
  readonly type = PolizaActionTypes.CerrarPolizaSuccess;
  constructor(public payload: { poliza: Poliza }) {}
}

export class UpsertPoliza implements Action {
  readonly type = PolizaActionTypes.UpsertPoliza;
  constructor(public payload: { poliza: Poliza }) {}
}

// Actualizar
export class UpdatePoliza implements Action {
  readonly type = PolizaActionTypes.UpdatePoliza;

  constructor(public payload: { poliza: Update<Poliza> }) {}
}
export class UpdatePolizaFail implements Action {
  readonly type = PolizaActionTypes.UpdatePolizaFail;

  constructor(public payload: { response: any }) {}
}
export class UpdatePolizaSuccess implements Action {
  readonly type = PolizaActionTypes.UpdatePolizaSuccess;

  constructor(public payload: { poliza: Poliza }) {}
}

// Generar folios
export class GenerarFolios implements Action {
  readonly type = PolizaActionTypes.GenerarFolios;
  constructor(public payload: { filter: PolizasFilter }) {}
}
export class GenerarFoliosFail implements Action {
  readonly type = PolizaActionTypes.GenerarFoliosFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarFoliosSuccess implements Action {
  readonly type = PolizaActionTypes.GenerarFoliosSuccess;
  constructor(public payload: { polizas: Poliza[] }) {}
}

// Generar complementos
export class GenerarComplementos implements Action {
  readonly type = PolizaActionTypes.GenerarComplementos;
  constructor(public payload: { polizaId: number }) {}
}
export class GenerarComplementosFail implements Action {
  readonly type = PolizaActionTypes.GenerarComplementosFail;
  constructor(public payload: { response: any }) {}
}

export class ProrratearPartida implements Action {
  readonly type = PolizaActionTypes.ProrratearPartida;
  constructor(
    public payload: { polizaId: number; polizaDet: number; data: any }
  ) {}
}

export class ProrratearPartidaFail implements Action {
  readonly type = PolizaActionTypes.ProrratearPartidaFail;
  constructor(public payload: { response: any }) {}
}

export class ProrratearPartidaSuccess implements Action {
  readonly type = PolizaActionTypes.ProrratearPartidaSuccess;
  constructor(public payload: { poliza: Poliza }) {}
}

export class CopiarPoliza implements Action {
  readonly type = PolizaActionTypes.CopiarPoliza;
  constructor(public payload: { polizaId: number }) {}
}
export class CopiarPolizaFail implements Action {
  readonly type = PolizaActionTypes.CopiarPolizaFail;
  constructor(public payload: { response: any }) {}
}
export class CopiarPolizaSuccess implements Action {
  readonly type = PolizaActionTypes.CopiarPolizaSuccess;
  constructor(public payload: { poliza: Poliza }) {}
}

export type PolizaActions =
  | LoadPolizas
  | LoadPolizasFail
  | LoadPolizasSuccess
  | CreatePoliza
  | CreatePolizaFail
  | CreatePolizaSuccess
  | DeletePoliza
  | DeletePolizaFail
  | DeletePolizaSuccess
  | UpdatePoliza
  | UpdatePolizaFail
  | UpdatePolizaSuccess
  | UpsertPoliza
  | RecalcularPoliza
  | RecalcularPolizaFail
  | RecalcularPolizaSuccess
  | SetPolizasFilter
  | SetPolizasSearchTerm
  | CreatePolizasEgreso
  | CreatePolizasEgresoFail
  | CreatePolizasEgresoSuccess
  | CerrarPoliza
  | CerrarPolizaFail
  | CerrarPolizaSuccess
  | GenerarPolizas
  | GenerarPolizasFail
  | GenerarPolizasSuccess
  | GenerarFolios
  | GenerarFoliosFail
  | GenerarFoliosSuccess
  | GenerarComplementos
  | GenerarComplementosFail
  | ProrratearPartida
  | ProrratearPartidaFail
  | ProrratearPartidaSuccess
  | CopiarPoliza
  | CopiarPolizaFail
  | CopiarPolizaSuccess;
