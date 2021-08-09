import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromSaldos from '../reducers/saldos.reducer';

import { SaldoPorCuentaContable } from '../../models';

import * as _ from 'lodash';

export const getSaldosState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.saldos
);

export const getSaldosEntities = createSelector(
  getSaldosState,
  fromSaldos.selectEntities
);

export const getSaldos = createSelector(getSaldosState, fromSaldos.selectAll);

export const getSaldosLoading = createSelector(
  getSaldosState,
  fromSaldos.getSaldosLoading
);

export const getSelectedSaldo = createSelector(
  getSaldosEntities,
  fromRoot.getRouterState,
  (entities, router): SaldoPorCuentaContable => {
    return router.state && entities[router.state.params.saldoId];
  }
);

export const getSelectedSaldoId = createSelector(
  getSelectedSaldo,
  saldo => (saldo ? saldo.id : undefined)
);

export const getSaldosPeriodo = createSelector(
  getSaldosState,
  fromSaldos.getSaldosPeriodo
);

export const getSaldosLoaded = createSelector(
  getSaldosState,
  fromSaldos.getSaldosLoaded
);
