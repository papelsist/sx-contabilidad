import { Action } from '@ngrx/store';

export enum MovimientosCostoActionTypes {
  LoadMovmientosCosto = '[MovimientosCosto] Load MovmientosCosto',
  LoadMovmientosCostoFail = '[MovimientosCosto] Load MovmientosCosto Fail',
  LoadMovmientosCostoSuccess = '[MovimientosCosto] Load MovmientosCosto Success',
  SelectCurrentProducto = '[MovimientosCosto] Select  current producto MovmientosCosto',
  SetPeriodoDeMovmientosCosto = '[MovimientosCosto] Selected periodo movimientos costo'
}

export class LoadMovmientosCosto implements Action {
  readonly type = MovimientosCostoActionTypes.LoadMovmientosCosto;
}
export class LoadMovmientosCostoFail implements Action {
  readonly type = MovimientosCostoActionTypes.LoadMovmientosCostoFail;
  constructor(public payload: any) {}
}
export class LoadMovmientosCostoSuccess implements Action {
  readonly type = MovimientosCostoActionTypes.LoadMovmientosCostoSuccess;
  constructor(public payload: { registros: any[] }) {}
}

export class SelectCurrentProducto implements Action {
  readonly type = MovimientosCostoActionTypes.SelectCurrentProducto;
  constructor(public payload: { selected: string }) {}
}

export class SetPeriodoDeMovmientosCosto implements Action {
  readonly type = MovimientosCostoActionTypes.SetPeriodoDeMovmientosCosto;
  constructor(
    public payload: { periodo: { ejercicio: number; mes: number } }
  ) {}
}

export type MovmientosCostoActions =
  | LoadMovmientosCosto
  | LoadMovmientosCostoFail
  | LoadMovmientosCostoSuccess
  | SetPeriodoDeMovmientosCosto
  | SelectCurrentProducto;
