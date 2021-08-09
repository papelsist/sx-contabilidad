import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromConceptos from '../reducers/ajuste-concepto.reducer';

export const getConceptoState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.conceptos
);

export const selectConceptos = createSelector(
  getConceptoState,
  fromConceptos.selectAll
);
export const selectConceptosLoaded = createSelector(
  getConceptoState,
  fromConceptos.getLoaded
);
export const selectConceptosLoading = createSelector(
  getConceptoState,
  fromConceptos.getLoading
);
