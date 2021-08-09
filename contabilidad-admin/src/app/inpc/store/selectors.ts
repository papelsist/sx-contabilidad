import { createSelector } from '@ngrx/store';

import * as fromFeature from './reducer';

import * as _ from 'lodash';

export const getInpcEntities = createSelector(
  fromFeature.getInpcState,
  fromFeature.selectEntities
);

export const selectInpc = createSelector(
  fromFeature.getInpcState,
  fromFeature.selectAll
);

export const selectSortedInpc = createSelector(selectInpc, rows =>
  _.sortBy(rows, ['ejercicio', 'mes'])
);

export const selectInpcLoading = createSelector(
  fromFeature.getInpcState,
  fromFeature.getLoading
);

export const selectInpcLoaded = createSelector(
  fromFeature.getInpcState,
  fromFeature.getLoaded
);
