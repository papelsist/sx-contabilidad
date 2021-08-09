import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DepreciacionFiscal } from 'app/activo-fijo/models/depreciacion-fiscal';
import {
  DepreciacionFiscalActions,
  DepreciacionFiscalActionTypes
} from '../actions/depreciacion-fiscal.actions';

export interface State extends EntityState<DepreciacionFiscal> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<DepreciacionFiscal> = createEntityAdapter<
  DepreciacionFiscal
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: DepreciacionFiscalActions
): State {
  switch (action.type) {
    case DepreciacionFiscalActionTypes.DeleteDepreciacionFiscal:
    case DepreciacionFiscalActionTypes.CreateDepreciacionFiscal:
    case DepreciacionFiscalActionTypes.LoadDepreciacionesFiscales: {
      return {
        ...state,
        loading: true
      };
    }
    case DepreciacionFiscalActionTypes.DeleteDepreciacionFiscalFail:
    case DepreciacionFiscalActionTypes.CreateDepreciacionFiscalFail:
    case DepreciacionFiscalActionTypes.LoadDepreciacionesFiscalesFail: {
      return {
        ...state,
        loading: false
      };
    }

    case DepreciacionFiscalActionTypes.LoadDepreciacionesFiscalesSuccess: {
      return adapter.addAll(action.payload.depreciaciones, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case DepreciacionFiscalActionTypes.CreateDepreciacionFiscalSuccess: {
      return adapter.addOne(action.payload.depreciacion, {
        ...state,
        loading: false
      });
    }

    case DepreciacionFiscalActionTypes.DeleteDepreciacionFiscalSuccess: {
      return adapter.removeOne(action.payload.deperciacionId, {
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
