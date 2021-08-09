import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMovimientos from '../reducers/movimientos.reducer';

export const getMovimientosState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.movimientos
);

export const getMovimientosEntities = createSelector(
  getMovimientosState,
  fromMovimientos.selectEntities
);

export const getMovimientos = createSelector(
  getMovimientosState,
  fromMovimientos.selectAll
);

export const getMovimientosLoading = createSelector(
  getMovimientosState,
  fromMovimientos.getMovimientosLoading
);
