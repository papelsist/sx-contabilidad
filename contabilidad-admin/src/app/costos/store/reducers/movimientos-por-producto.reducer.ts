import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  MovimientosActionTypes,
  MovimientosActions
} from '../actions/movimientos-por-producto.actions';

import { MovimientosPorProducto } from '../../models';
import { Inventario } from '../../../models/inventario';

export interface State extends EntityState<Inventario> {
  loading: boolean;
}

export const adapter: EntityAdapter<Inventario> = createEntityAdapter<
  Inventario
>();

export const initialState: State = adapter.getInitialState({
  loading: false
});

export function reducer(
  state = initialState,
  action: MovimientosActions
): State {
  switch (action.type) {
    case MovimientosActionTypes.LoadMovimientos: {
      return adapter.removeAll({
        ...state
      });
    }

    case MovimientosActionTypes.LoadMovimientosFail: {
      return {
        ...state,
        loading: false
      };
    }

    case MovimientosActionTypes.LoadMovimientosSuccess: {
      return adapter.addAll(action.payload.movimientos, {
        ...state,
        loading: false
      });
    }

    case MovimientosActionTypes.ClearMovimientos: {
      return adapter.removeAll({
        ...state
      });
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const getMovimientosLoading = (state: State) => state.loading;
