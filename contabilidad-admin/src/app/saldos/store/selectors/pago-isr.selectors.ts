import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromPagoIsr from '../reducers/pago-isr.reducer';

export const getPagoIsrState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.pagoIsr
);

export const getPagoIsrEntities = createSelector(
  getPagoIsrState,
  fromPagoIsr.selectEntities
);

export const getAllPagoIsr = createSelector(
  getPagoIsrState,
  fromPagoIsr.selectAll
);

export const getPagoIsrLoading = createSelector(
  getPagoIsrState,
  fromPagoIsr.getLoading
);
