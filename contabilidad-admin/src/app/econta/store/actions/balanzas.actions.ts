import { Action } from "@ngrx/store";

import { Balanza, Empresa } from "../../models";

export enum BalanzasActionTypes {
  LoadBalanzas = "[Balanza Guard] Load Balanzas",
  LoadBalanzasSuccess = "[Balanza API] Load Balanzas Success",
  LoadBalanzasFail = "[Balanza API] Load Balanzas Fail",

  GenerarBalanza = "[Balanzas component] Generar balanza",
  GenerarBalanzaFail = "[Balanzas API] Generar balanza fail",
  GenerarBalanzaSuccess = "[Balanzas API] Generar balanza success",

  UpsertBalanza = "[Balanza exists guard] Upsert balanza",
  MostrarBalanzaXml = "[Balanzas component] Mostrar balanza XML",
  DescargarBalanzaXml = "[Balanzas component] Descargar balanza XML",

  SetBalanzasEmpresa = "[Balanza component] Set balanzas empres"
}

// Load balanzas
export class LoadBalanzas implements Action {
  readonly type = BalanzasActionTypes.LoadBalanzas;
}
export class LoadBalanzasFail implements Action {
  readonly type = BalanzasActionTypes.LoadBalanzasFail;

  constructor(public payload: { response: any }) {}
}
export class LoadBalanzasSuccess implements Action {
  readonly type = BalanzasActionTypes.LoadBalanzasSuccess;
  constructor(public payload: { balanzas: Balanza[] }) {}
}

export class GenerarBalanza implements Action {
  readonly type = BalanzasActionTypes.GenerarBalanza;
  constructor(
    public payload: { empresa: Empresa; ejercicio: number; mes: number }
  ) {}
}
export class GenerarBalanzaFail implements Action {
  readonly type = BalanzasActionTypes.GenerarBalanzaFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarBalanzaSuccess implements Action {
  readonly type = BalanzasActionTypes.GenerarBalanzaSuccess;
  constructor(public payload: { balanza: Balanza }) {}
}

export class UpsertBalanza implements Action {
  readonly type = BalanzasActionTypes.UpsertBalanza;
  constructor(public payload: { balanza: Balanza }) {}
}

export class MostrarBalanzaXml implements Action {
  readonly type = BalanzasActionTypes.MostrarBalanzaXml;

  constructor(public payload: { balanza: Partial<Balanza> }) {}
}

export class DescargarBalanzaXml implements Action {
  readonly type = BalanzasActionTypes.DescargarBalanzaXml;

  constructor(public payload: { balanza: Partial<Balanza> }) {}
}

export class SetBalanzasEmpresa implements Action {
  readonly type = BalanzasActionTypes.SetBalanzasEmpresa;
  constructor(public payload: { empresa: Empresa }) {}
}

export type BalanzasActions =
  | LoadBalanzas
  | LoadBalanzasFail
  | LoadBalanzasSuccess
  | GenerarBalanza
  | GenerarBalanzaFail
  | GenerarBalanzaSuccess
  | UpsertBalanza
  | MostrarBalanzaXml
  | DescargarBalanzaXml
  | SetBalanzasEmpresa;
