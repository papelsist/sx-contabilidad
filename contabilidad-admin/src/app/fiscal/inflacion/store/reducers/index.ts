import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAjustes from './ajuste-anual.reducer';
import * as fromConceptos from './ajuste-concepto.reducer';

export interface State {
  ajustes: fromAjustes.State;
  conceptos: fromConceptos.State;
}

export const reducers: ActionReducerMap<State> = {
  ajustes: fromAjustes.reducer,
  conceptos: fromConceptos.reducer
};

export const getState = createFeatureSelector<State>('inflacion');
