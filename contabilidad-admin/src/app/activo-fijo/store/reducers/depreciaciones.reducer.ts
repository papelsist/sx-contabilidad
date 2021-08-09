import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  DepreciacionActionTypes,
  DepreciacionesActions
} from '../actions/depreciacion.actions';
import { Depreciacion } from 'app/activo-fijo/models/depreciacion';

export interface State extends EntityState<Depreciacion> {
  loading: boolean;
  loaded: boolean;
}

export function sortDepreciaciones(item1: Depreciacion, item2: Depreciacion) {
  if (item1.ejercicio  === item2.ejercicio) {
    return item1.mes - item2.mes;
  } else {
    return item1.ejercicio - item2.ejercicio;
  }
}

export const adapter: EntityAdapter<Depreciacion> = createEntityAdapter<
  Depreciacion
>({sortComparer: sortDepreciaciones});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: DepreciacionesActions
): State {
  switch (action.type) {
    case DepreciacionActionTypes.DeleteDepreciacion:
    case DepreciacionActionTypes.CreateDepreciacion:
    case DepreciacionActionTypes.LoadDepreciaciones: {
      return {
        ...state,
        loading: true
      };
    }
    case DepreciacionActionTypes.DeleteDepreciacionFail:
    case DepreciacionActionTypes.CreateDepreciacionFail:
    case DepreciacionActionTypes.LoadDepreciacionesFail: {
      return {
        ...state,
        loading: false
      };
    }

    case DepreciacionActionTypes.LoadDepreciacionesSuccess: {
      return adapter.addAll(action.payload.depreciaciones, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case DepreciacionActionTypes.CreateDepreciacionSuccess: {
      return adapter.addOne(action.payload.depreciacion, {
        ...state,
        loading: false
      });
    }

    case DepreciacionActionTypes.DeleteDepreciacionSuccess: {
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
