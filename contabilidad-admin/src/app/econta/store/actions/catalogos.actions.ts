import { Action } from "@ngrx/store";

import { Catalogo, Empresa } from "../../models";

export enum CatalogosActionTypes {
  LoadCatalogos = "[Catalogo Guard] Load Catalogos",
  LoadCatalogosSuccess = "[Catalogo API] Load Catalogos Success",
  LoadCatalogosFail = "[Catalogo API] Load Catalogos Fail",

  GenerarCatalogo = "[Catalogos component] Generar catalogo",
  GenerarCatalogoFail = "[Catalogos API] Generar catalogo fail",
  GenerarCatalogoSuccess = "[Catalogos API] Generar catalogo success",

  UpserCatalogo = "[Catalogo exists guard] Upsert catalogo",
  MostrarCatalogoXml = "[Catalogos component] Mostrar catalogo XML",
  DescargarCatalogoXml = "[Catalogos component] Descargar catalogo XML",

  SetEmpresa = "[Catalogos component] Set empres"
}

// Load catalogos
export class LoadCatalogos implements Action {
  readonly type = CatalogosActionTypes.LoadCatalogos;
}
export class LoadCatalogosFail implements Action {
  readonly type = CatalogosActionTypes.LoadCatalogosFail;

  constructor(public payload: { response: any }) {}
}
export class LoadCatalogosSuccess implements Action {
  readonly type = CatalogosActionTypes.LoadCatalogosSuccess;
  constructor(public payload: { catalogos: Catalogo[] }) {}
}

export class GenerarCatalogo implements Action {
  readonly type = CatalogosActionTypes.GenerarCatalogo;
  constructor(
    public payload: {
      empresa: Partial<Empresa>;
      ejercicio: number;
      mes: number;
    }
  ) {}
}
export class GenerarCatalogoFail implements Action {
  readonly type = CatalogosActionTypes.GenerarCatalogoFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarCatalogoSuccess implements Action {
  readonly type = CatalogosActionTypes.GenerarCatalogoSuccess;
  constructor(public payload: { catalogo: Catalogo }) {}
}

export class UpserCatalogo implements Action {
  readonly type = CatalogosActionTypes.UpserCatalogo;
  constructor(public payload: { catalogo: Catalogo }) {}
}

export class MostrarCatalogoXml implements Action {
  readonly type = CatalogosActionTypes.MostrarCatalogoXml;

  constructor(public payload: { catalogo: Partial<Catalogo> }) {}
}

export class DescargarCatalogoXml implements Action {
  readonly type = CatalogosActionTypes.DescargarCatalogoXml;

  constructor(public payload: { catalogo: Partial<Catalogo> }) {}
}

export class SetEmpresa implements Action {
  readonly type = CatalogosActionTypes.SetEmpresa;
  constructor(public payload: { empresa: Empresa }) {}
}

export type CatalogosActions =
  | LoadCatalogos
  | LoadCatalogosFail
  | LoadCatalogosSuccess
  | GenerarCatalogo
  | GenerarCatalogoFail
  | GenerarCatalogoSuccess
  | UpserCatalogo
  | MostrarCatalogoXml
  | DescargarCatalogoXml
  | SetEmpresa;
