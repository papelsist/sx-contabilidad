import { createSelector } from '@ngrx/store';

import * as fromRoot from 'app/store';
import * as fromFeature from '../reducers';
import * as fromProductos from '../reducers/movimientos-costo.reducer';

export const getMovimientosCostoState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.movimientosCosto
);

export const getMovimientosCostoEntities = createSelector(
  getMovimientosCostoState,
  fromProductos.selectEntities
);

export const getAllMovimientosCosto = createSelector(
  getMovimientosCostoState,
  fromProductos.selectAll
);

export const getMovimientosCostoLoaded = createSelector(
  getMovimientosCostoState,
  fromProductos.getCostosLoaded
);

export const getMovimientosCostoLoading = createSelector(
  getMovimientosCostoState,
  fromProductos.getCostosLoading
);

export const getMovimientosCostoPeriodo = createSelector(
  getMovimientosCostoState,
  fromProductos.getPeriodoDeCosto
);

export const getCurrentProductoId = createSelector(
  getMovimientosCostoState,
  fromProductos.getSelectedCostoId
);

export const getSelectedProducto = createSelector(
  getMovimientosCostoEntities,
  getCurrentProductoId,
  (entities, id) => {
    return entities[id];
  }
);
