import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromPolizas from './polizas.reducer';
import * as fromContext from './ui-context.reducre';

export interface State {
  context: fromContext.State;
  polizas: fromPolizas.State;
}

export const reducers: ActionReducerMap<State> = {
  context: fromContext.reducer,
  polizas: fromPolizas.reducer
};

export const getState = createFeatureSelector<State>('polizas');

export const getContextState = createSelector(getState, state => state.context);

export const getGrupos = createSelector(getContextState, fromContext.getGrupos);

export const getPeriodoDePolizas = createSelector(
  getContextState,
  fromContext.getPeriodo
);
