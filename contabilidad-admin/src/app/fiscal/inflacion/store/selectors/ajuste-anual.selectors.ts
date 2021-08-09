import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAjuste from '../reducers/ajuste-anual.reducer';

export const getAjusteState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.ajustes
);

export const selectAjustes = createSelector(
  getAjusteState,
  fromAjuste.selectAll
);

export const selectActivos = createSelector(selectAjustes, data =>
  data.filter(item => item.concepto.tipo === 'ACTIVO')
);

export const selectPasivos = createSelector(selectAjustes, data =>
  data.filter(item => item.concepto.tipo === 'PASIVO')
);

export const selectAjustesLoaded = createSelector(
  getAjusteState,
  fromAjuste.getLoaded
);
export const selectAjustesLoading = createSelector(
  getAjusteState,
  fromAjuste.getLoading
);
