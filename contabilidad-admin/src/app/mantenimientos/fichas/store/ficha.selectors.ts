import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from 'app/store';
import * as fromFeature from './';
import * as fromFichas from './ficha.reducer';

import { Ficha } from '../models/ficha';

export const getFichasState = createFeatureSelector<fromFichas.State>('fichas');

export const getFichasEntities = createSelector(
  getFichasState,
  fromFichas.selectEntities
);

export const getAllFichas = createSelector(
  getFichasState,
  fromFichas.selectAll
);

export const getFichasLoaded = createSelector(
  getFichasState,
  fromFichas.getFichasLoaded
);

export const getFichasLoading = createSelector(
  getFichasState,
  fromFichas.getFichasLoading
);

export const getSelectedFicha = createSelector(
  getFichasEntities,
  fromRoot.getRouterState,
  (entities, router): Ficha => {
    return router.state && entities[router.state.params.fichaId];
  }
);

export const getFichasFilter = createSelector(
  getFichasState,
  fromFichas.getFichasFilter
);

export const getFichasFecha = createSelector(
  getFichasFilter,
  filter => filter.fecha
);
