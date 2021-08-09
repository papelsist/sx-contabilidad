import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from 'app/store';
import * as fromCheques from './cheques.reducer';
import * as _ from 'lodash';
import { Cheque } from '../models/cheque';




export const getChequesState = createFeatureSelector<
  fromCheques.State
>('cheques');

export const getChequesEntities = createSelector(
  getChequesState,
  fromCheques.selectEntities
);

export const getAllCheques = createSelector(
  getChequesState,
  fromCheques.selectAll
);

export const getAllChequesPorEntregar = createSelector(
  getAllCheques,
  cheques => {
    return cheques.filter(item => !!item.entregado);
  }
);

export const getChequesLoaded = createSelector(
  getChequesState,
  fromCheques.getChequesLoaded
);

export const getChequesLoading = createSelector(
  getChequesState,
  fromCheques.getChequesLoading
);

export const getSelectedCheque = createSelector(
  getChequesEntities,
  fromRoot.getRouterState,
  (entities, router): Cheque => {
    return router.state && entities[router.state.params.chequeId];
  }
);

export const getChequesFilter = createSelector(
  getChequesState,
  fromCheques.getChequesFilter
);

export const getChequesSearchTerm = createSelector(
  getChequesState,
  fromCheques.getChequesSearchTerm
);
