import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCostoPromedio from './costo-promedio.reducer';
import * as fromMovimientosCosto from './movimientos-costo.reducer';
import * as fromMovimientos from './movimientos-por-producto.reducer';

export interface State {
  costosPromedio: fromCostoPromedio.State;
  movimientosCosto: fromMovimientosCosto.State;
  movimientos: fromMovimientos.State;
}

export const reducers: ActionReducerMap<State> = {
  costosPromedio: fromCostoPromedio.reducer,
  movimientosCosto: fromMovimientosCosto.reducer,
  movimientos: fromMovimientos.reducer
};

export const getState = createFeatureSelector<State>('costos');
