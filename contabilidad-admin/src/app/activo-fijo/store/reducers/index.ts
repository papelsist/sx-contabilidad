import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromActivos from './activos.reducer';
import * as fromDepreciacion from './depreciaciones.reducer';
import * as fromFiscal from './depreciaciones-fiscales.reducer';

export interface State {
  activos: fromActivos.State;
  depreciaciones: fromDepreciacion.State;
  fiscales: fromFiscal.State;
}

export const reducers: ActionReducerMap<State> = {
  activos: fromActivos.reducer,
  depreciaciones: fromDepreciacion.reducer,
  fiscales: fromFiscal.reducer
};

export const getState = createFeatureSelector<State>('activo-fijo');
