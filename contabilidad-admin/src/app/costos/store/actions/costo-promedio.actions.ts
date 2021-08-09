import { Action } from '@ngrx/store';

import { CostoPromedio } from '../../models';

export enum CostoActionTypes {
  LoadCostos = '[CostoPromedio] Load costos',
  LoadCostosFail = '[CostoPromedio] Load costos Fail',
  LoadCostosSuccess = '[CostoPromedio] Load costos Success',
  SetPeriodoDeCostos = '[CostoPromedio] Set Periodo de costos',
  CalculoDeCostoPromedio = '[CostoPromedio] Calculo de costo promedio',
  CalculoDeCostoPromedioFail = '[CostoPromedio] Calculo de costo promedio fail',
  CalculoDeCostoPromedioSuccess = '[CostoPromedio] Calculo de costo promedio success',
  AplicarCostoPromedio = '[CostoPromedio] Aplicare costo promedio',
  AplicarCostoPromedioFail = '[CostoPromedio] Aplicare costo promedio fail',
  AplicarCostoPromedioSuccess = '[CostoPromedio] Aplicare costo promedio success',
  SetSelectedCosto = '[CostoPromedio] Set selected costo'
}

export class LoadCostos implements Action {
  readonly type = CostoActionTypes.LoadCostos;
}
export class LoadCostosFail implements Action {
  readonly type = CostoActionTypes.LoadCostosFail;
  constructor(public payload: any) {}
}
export class LoadCostosSuccess implements Action {
  readonly type = CostoActionTypes.LoadCostosSuccess;
  constructor(public payload: { costos: CostoPromedio[] }) {}
}

export class SetPeriodoDeCostos implements Action {
  readonly type = CostoActionTypes.SetPeriodoDeCostos;
  constructor(
    public payload: { periodo: { ejercicio: number; mes: number } }
  ) {}
}

export class CalculoDeCostoPromedio implements Action {
  readonly type = CostoActionTypes.CalculoDeCostoPromedio;
  constructor(
    public payload: { periodo: { ejercicio: number; mes: number } }
  ) {}
}
export class CalculoDeCostoPromedioFail implements Action {
  readonly type = CostoActionTypes.CalculoDeCostoPromedioFail;
  constructor(public payload: { response: any }) {}
}
export class CalculoDeCostoPromedioSuccess implements Action {
  readonly type = CostoActionTypes.CalculoDeCostoPromedioSuccess;
  constructor(public payload: { costos: CostoPromedio[] }) {}
}

export class AplicarCostoPromedio implements Action {
  readonly type = CostoActionTypes.AplicarCostoPromedio;
  constructor(
    public payload: { periodo: { ejercicio: number; mes: number } }
  ) {}
}
export class AplicarCostoPromedioFail implements Action {
  readonly type = CostoActionTypes.AplicarCostoPromedioFail;
  constructor(public payload: { response: any }) {}
}
export class AplicarCostoPromedioSuccess implements Action {
  readonly type = CostoActionTypes.AplicarCostoPromedioSuccess;
}

export class SetSelectedCosto implements Action {
  readonly type = CostoActionTypes.SetSelectedCosto;
  constructor(public payload: { selected: number }) {}
}

export type CostosActions =
  | LoadCostos
  | LoadCostosFail
  | LoadCostosSuccess
  | SetPeriodoDeCostos
  | CalculoDeCostoPromedio
  | CalculoDeCostoPromedioFail
  | CalculoDeCostoPromedioSuccess
  | AplicarCostoPromedio
  | AplicarCostoPromedioFail
  | AplicarCostoPromedioSuccess
  | SetSelectedCosto;
