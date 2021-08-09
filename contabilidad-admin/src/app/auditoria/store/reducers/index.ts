import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMetadata from './metadata.reducer';
import * as fromCfdi from './auditoria-cfdi.reducer';

export interface State {
  metadata: fromMetadata.State;
  cfdi: fromCfdi.State;
}

export const reducers: ActionReducerMap<State> = {
  metadata: fromMetadata.reducer,
  cfdi: fromCfdi.reducer
};

export const getState = createFeatureSelector<State>('auditoria');
