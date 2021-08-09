import { createSelector } from '@ngrx/store';

import * as fromRoot from 'app/store';
import * as fromFeature from '../reducers';
import * as fromCostos from '../reducers/costo-promedio.reducer';

import { CostoPromedio } from '../../models';

export const getCostoPromedioState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.costosPromedio
);

export const getCostosEntities = createSelector(
  getCostoPromedioState,
  fromCostos.selectEntities
);

export const getAllCostos = createSelector(
  getCostoPromedioState,
  fromCostos.selectAll
);

export const getCostosLoaded = createSelector(
  getCostoPromedioState,
  fromCostos.getCostosLoaded
);

export const getCostosLoading = createSelector(
  getCostoPromedioState,
  fromCostos.getCostosLoading
);

export const getCostosPeriodo = createSelector(
  getCostoPromedioState,
  fromCostos.getPeriodoDeCosto
);

export const getSCurrentCosto = createSelector(
  getCostosEntities,
  fromRoot.getRouterState,
  (entities, router): CostoPromedio => {
    return router.state && entities[router.state.params.costoId];
  }
);

export const getSelectedCostoId = createSelector(
  getCostoPromedioState,
  fromCostos.getSelectedCostoId
);

export const getSelectedCosto = createSelector(
  getCostosEntities,
  getSelectedCostoId,
  (entities, costoId) => {
    return entities[costoId];
  }
);
