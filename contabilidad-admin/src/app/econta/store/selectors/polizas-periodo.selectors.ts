import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromPolizas from '../reducers/polizas-periodo.reducer';

import { PolizasPeriodo } from '../../models';

import * as _ from 'lodash';

export const getPolizasPeriodoState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.polizas
);

export const getPolizasPeriodoEntities = createSelector(
  getPolizasPeriodoState,
  fromPolizas.selectEntities
);

export const getPolizasPeriodo = createSelector(
  getPolizasPeriodoState,
  fromPolizas.selectAll
);

export const getPolizasPeriodoLoading = createSelector(
  getPolizasPeriodoState,
  fromPolizas.getPolizasPeriodoLoading
);

export const getSelectedPolizasPeriodo = createSelector(
  getPolizasPeriodoEntities,
  fromRoot.getRouterState,
  (entities, router): PolizasPeriodo => {
    return router.state && entities[router.state.params.polizasPeriodoId];
  }
);

export const getSelectedPolizasPeriodoId = createSelector(
  getSelectedPolizasPeriodo,
  polizap => (polizap ? polizap.id : undefined)
);

export const getPolizasPeriodoLoaded = createSelector(
  getPolizasPeriodoState,
  fromPolizas.getPolizasPeriodoLoaded
);
