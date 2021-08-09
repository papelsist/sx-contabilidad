import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { AjusteAnual } from '../../model';
import { AjusteAnualActions, AjusteAnualActionTypes } from '../actions';

export interface State extends EntityState<AjusteAnual> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<AjusteAnual> = createEntityAdapter<
  AjusteAnual
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: AjusteAnualActions
): State {
  switch (action.type) {
    case AjusteAnualActionTypes.LoadAjustes:
    case AjusteAnualActionTypes.GenerarAjustes: {
      return {
        ...state,
        loading: true
      };
    }

    case AjusteAnualActionTypes.LoadAjustesFail:
    case AjusteAnualActionTypes.GenerarAjustesFail: {
      return {
        ...state,
        loading: false
      };
    }

    case AjusteAnualActionTypes.LoadAjustesSuccess: {
      return adapter.addAll(action.payload.ajus, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case AjusteAnualActionTypes.GenerarAjustesSuccess: {
      return adapter.addAll(action.payload.ajus, {
        ...state,
        loading: false
      });
    }
  }
  return state;
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
