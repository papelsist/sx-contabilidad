import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from 'app/store';
import * as fromAplicaciones from './aplicacion-de-corte.reducer';

import { CorteDeTarjetaAplicacion } from '../models';

export const getAplicacionesState = createFeatureSelector<
  fromAplicaciones.State
>('comisionesTarjeta');

export const getAplicacionesEntities = createSelector(
  getAplicacionesState,
  fromAplicaciones.selectEntities
);

export const getAllAplicaciones = createSelector(
  getAplicacionesState,
  fromAplicaciones.selectAll
);

export const getAplicacionesLoaded = createSelector(
  getAplicacionesState,
  fromAplicaciones.getAplicacionDeCorteLoaded
);

export const getAplicacionesLoading = createSelector(
  getAplicacionesState,
  fromAplicaciones.getAplicacionDeCorteLoading
);

export const getSelectedAplicacion = createSelector(
  getAplicacionesEntities,
  fromRoot.getRouterState,
  (entities, router): CorteDeTarjetaAplicacion => {
    return router.state && entities[router.state.params.aplicacionId];
  }
);
