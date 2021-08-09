import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCatalogos from './catalogos.reducer';
import * as fromBalanzas from './balanzas.reducer';
import * as fromPolizas from './polizas-periodo.reducer';

export interface State {
  catalogos: fromCatalogos.State;
  balanzas: fromBalanzas.State;
  polizas: fromPolizas.State;
}

export const reducers: ActionReducerMap<State> = {
  catalogos: fromCatalogos.reducer,
  balanzas: fromBalanzas.reducer,
  polizas: fromPolizas.reducer
};

export const getState = createFeatureSelector<State>('econta');
