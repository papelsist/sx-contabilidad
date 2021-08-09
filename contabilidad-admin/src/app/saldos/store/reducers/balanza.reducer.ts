import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { BalanzaActionTypes, BalanzaActions } from '../actions/balanza.actions';

import { SaldoPorCuentaContable } from '../../models';

export interface State extends EntityState<SaldoPorCuentaContable> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<
  SaldoPorCuentaContable
> = createEntityAdapter<SaldoPorCuentaContable>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(state = initialState, action: BalanzaActions): State {
  switch (action.type) {
    case BalanzaActionTypes.LoadBalanza: {
      return {
        ...state,
        loading: true
      };
    }
    case BalanzaActionTypes.LoadBalanzaFail: {
      return {
        ...state,
        loading: false
      };
    }
    case BalanzaActionTypes.LoadBalanzaSuccess: {
      return adapter.addAll(action.payload.saldos, {
        ...state,
        loading: false,
        loaded: true
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

export const getBalanzaLoaded = (state: State) => state.loaded;
export const getBalanzaLoading = (state: State) => state.loading;
