import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromActivos from '../reducers/activos.reducer';
import { ActivoFijo } from '../../models/activo-fijo';

export const getActivoState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.activos
);

export const getActivosEntities = createSelector(
  getActivoState,
  fromActivos.selectEntities
);

export const selectActivos = createSelector(
  getActivoState,
  fromActivos.selectAll
);

export const selectActivosBajas = createSelector(selectActivos, activos =>
  activos.filter(item => item.baja)
);

export const selectActivosLoading = createSelector(
  getActivoState,
  fromActivos.getLoading
);
export const selectActivosLoaded = createSelector(
  getActivoState,
  fromActivos.getLoaded
);

export const selectCurrentActivo = createSelector(
  getActivosEntities,
  fromRoot.getRouterState,
  (entities, router): ActivoFijo => {
    return router.state && entities[router.state.params.activoId];
  }
);
