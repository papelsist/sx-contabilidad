import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAplicacionDeCorte from './aplicacion-de-corte.reducer';

export interface State {
  aplicaciones_de_corte: fromAplicacionDeCorte.State;
}

export const reducers: ActionReducerMap<State> = {
  aplicaciones_de_corte: fromAplicacionDeCorte.reducer
};

export const getState = createFeatureSelector<State>('comisionesTarjeta');
