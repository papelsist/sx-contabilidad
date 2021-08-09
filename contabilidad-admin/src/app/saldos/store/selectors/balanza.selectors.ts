import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromBalanza from '../reducers/balanza.reducer';

export const getBalanzaState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.balanza
);

export const selectBalanza = createSelector(
  getBalanzaState,
  fromBalanza.selectAll
);

export const selectBalanzaLoading = createSelector(
  getBalanzaState,
  fromBalanza.getBalanzaLoading
);
export const selectBalanzaLoaded = createSelector(
  getBalanzaState,
  fromBalanza.getBalanzaLoaded
);
