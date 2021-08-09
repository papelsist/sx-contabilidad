import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDepreciaciones from '../reducers/depreciaciones-fiscales.reducer';

export const getDepreciacionFiscalState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.fiscales
);

export const getDepreciacionesFiscalesEntities = createSelector(
  getDepreciacionFiscalState,
  fromDepreciaciones.selectEntities
);

export const selectFiscales = createSelector(
  getDepreciacionFiscalState,
  fromDepreciaciones.selectAll
);

export const selectFiscalLoading = createSelector(
  getDepreciacionFiscalState,
  fromDepreciaciones.getLoading
);


