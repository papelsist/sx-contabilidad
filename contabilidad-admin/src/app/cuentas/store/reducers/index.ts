import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCuentas from './cuentas.reducer';

export interface State {
  cuentas: fromCuentas.State;
}

export const reducers: ActionReducerMap<State> = {
  cuentas: fromCuentas.reducer
};

export const getState = createFeatureSelector<State>('cuentas');
