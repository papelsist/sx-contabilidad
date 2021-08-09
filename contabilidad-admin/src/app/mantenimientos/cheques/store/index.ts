import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCheques from './cheques.reducer';

export interface State {
  cheques: fromCheques.State;
}

export const reducers: ActionReducerMap<State> = {
  cheques: fromCheques.reducer
};

export const getState = createFeatureSelector<State>('cheques');
