import { Action } from '@ngrx/store';

import { MovimientosPorProducto } from '../../models';
import { Inventario } from 'app/models/inventario';

export enum MovimientosActionTypes {
  LoadMovimientos = '[Inventario] Load Movimientos de inventario',
  LoadMovimientosFail = '[Inventario] Load Movimientos de inventario Fail',
  LoadMovimientosSuccess = '[Inventario] Load Movimientos de inventario Success',
  ClearMovimientos = '[MovimientosCosto] Clear movimientos  Movimientos de inventario'
}

export class LoadMovimientos implements Action {
  readonly type = MovimientosActionTypes.LoadMovimientos;
  constructor(
    public payload: {
      producto: string;
      periodo: { ejercicio: number; mes: number };
    }
  ) {}
}
export class LoadMovimientosFail implements Action {
  readonly type = MovimientosActionTypes.LoadMovimientosFail;
  constructor(public payload: any) {}
}
export class LoadMovimientosSuccess implements Action {
  readonly type = MovimientosActionTypes.LoadMovimientosSuccess;
  constructor(public payload: { movimientos: Inventario[] }) {}
}

export class ClearMovimientos implements Action {
  readonly type = MovimientosActionTypes.ClearMovimientos;
}

export type MovimientosActions =
  | LoadMovimientos
  | LoadMovimientosFail
  | LoadMovimientosSuccess
  | ClearMovimientos;
