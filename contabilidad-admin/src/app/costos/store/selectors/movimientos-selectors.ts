import { createSelector } from '@ngrx/store';

import * as fromRoot from 'app/store';
import * as fromFeature from '../reducers';
import * as fromMovimientos from '../reducers/movimientos-por-producto.reducer';

export const getMovimientosState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.movimientos
);

export const getMovimientosEntities = createSelector(
  getMovimientosState,
  fromMovimientos.selectEntities
);

export const getAllMovimientos = createSelector(
  getMovimientosState,
  fromMovimientos.selectAll
);

export const getMovimientosLoading = createSelector(
  getMovimientosState,
  fromMovimientos.getMovimientosLoading
);
/*
export const selectMovimientos = (id: string) =>
  createSelector(getMovimientosEntities, entities => {
    const found = entities[id];
    if (found) {
      console.log('Localizando movimientos para: ', id);
      return found.movimientos;
    } else {
      return [];
    }
  });

  */
