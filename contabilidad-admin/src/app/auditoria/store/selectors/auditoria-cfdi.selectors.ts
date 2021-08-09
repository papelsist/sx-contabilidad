import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCfdi from '../reducers/auditoria-cfdi.reducer';

export const getCfdiState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.cfdi
);

export const selectAuditoriaCfdi = createSelector(
  getCfdiState,
  fromCfdi.selectAll
);

export const selectAuditoriaLoading = createSelector(
  getCfdiState,
  fromCfdi.getLoading
);

export const selectAuditoriaLoaded = createSelector(
  getCfdiState,
  fromCfdi.getLoaded
);

export const selectAuditoriaFilter = createSelector(
  getCfdiState,
  fromCfdi.getFilter
);
