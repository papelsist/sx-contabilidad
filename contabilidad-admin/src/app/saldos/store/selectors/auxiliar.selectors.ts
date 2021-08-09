import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAuxiliar from '../reducers/auxiliar.reducer';

export const getAuxiliarState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.auxiliar
);

export const getAllAuxiliar = createSelector(
  getAuxiliarState,
  fromAuxiliar.getRegistros
);

export const getAuxiliarLoading = createSelector(
  getAuxiliarState,
  fromAuxiliar.getAuxiliarLoading
);

export const getCurrentCuenta = createSelector(
  getAuxiliarState,
  fromAuxiliar.getCuentaInicial
);
