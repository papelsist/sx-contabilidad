import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as fromActions from '../actions/diot.actions';
import { DiotActionTypes } from '../actions/diot.actions';
import { Diot } from 'app/saldos/models';

export interface State extends EntityState<Diot> {
  loading: boolean;
}

export const adapter: EntityAdapter<Diot> = createEntityAdapter();

export const initialState = adapter.getInitialState({
  loading: false
});

export function reducer(
  state = initialState,
  action: fromActions.DiotActions
): State {
  switch (action.type) {
    case DiotActionTypes.GenerarArchivoDiot:
    case DiotActionTypes.GenerarDiot:
    case DiotActionTypes.LoadDiot: {
      return {
        ...state,
        loading: true
      };
    }
    case DiotActionTypes.GenerarArchivoDiotFail:
    case DiotActionTypes.GenerarDiotFail:
    case DiotActionTypes.LoadDiotFail: {
      return {
        ...state,
        loading: false
      };
    }

    case DiotActionTypes.GenerarDiotSuccess:
    case DiotActionTypes.LoadDiotSuccess: {
      return adapter.addAll(action.payload.rows, {
        ...state,
        loading: false
      });
    }

    case DiotActionTypes.GenerarArchivoDiotSuccess: {
      return {
        ...state,
        loading: false
      };
    }

    default:
      return {
        ...state
      };
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const getLoading = (state: State) => state.loading;
