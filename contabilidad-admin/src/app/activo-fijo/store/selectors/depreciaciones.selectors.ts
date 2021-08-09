import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDepreciaciones from '../reducers/depreciaciones.reducer';
import { Depreciacion } from '../../models/depreciacion';

export const getDepreciacionState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.depreciaciones
);

export const getDepreciacionsEntities = createSelector(
  getDepreciacionState,
  fromDepreciaciones.selectEntities
);

export const selectDepreciacions = createSelector(
  getDepreciacionState,
  fromDepreciaciones.selectAll
);

export const selectDepreciacionsLoading = createSelector(
  getDepreciacionState,
  fromDepreciaciones.getLoading
);
export const selectDepreciacionsLoaded = createSelector(
  getDepreciacionState,
  fromDepreciaciones.getLoaded
);

