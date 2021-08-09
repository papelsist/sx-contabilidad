import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDiot from '../reducers/diot.reducer';

export const getDiotState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.diot
);

export const getDiotEntities = createSelector(
  getDiotState,
  fromDiot.selectEntities
);

export const getAllDiot = createSelector(getDiotState, fromDiot.selectAll);

export const getDiotLoading = createSelector(getDiotState, fromDiot.getLoading);
