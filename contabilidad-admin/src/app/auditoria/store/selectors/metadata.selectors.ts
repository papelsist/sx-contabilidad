import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMetadata from '../reducers/metadata.reducer';

export const getMetadataState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.metadata
);

export const selectMetadata = createSelector(
  getMetadataState,
  fromMetadata.selectAll
);

export const selectMetadataLoading = createSelector(
  getMetadataState,
  fromMetadata.getLoading
);

export const selectMetadataLoaded = createSelector(
  getMetadataState,
  fromMetadata.getLoaded
);

export const selectMetadataFilter = createSelector(
  getMetadataState,
  fromMetadata.getFilter
);
