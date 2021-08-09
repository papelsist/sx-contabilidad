import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as fromActions from '../actions/movimiento.actions';
import { MovimientoActionTypes } from '../actions/movimiento.actions';
import { PolizaDet } from 'app/polizas/models';

export interface State extends EntityState<PolizaDet> {
  loading: boolean;
}

export const adapter: EntityAdapter<PolizaDet> = createEntityAdapter();

export const initialState = adapter.getInitialState({
  loading: false
});

export function reducer(
  state = initialState,
  action: fromActions.MovimientosActions
): State {
  switch (action.type) {
    case MovimientoActionTypes.ReclasificarMovimientos:
    case MovimientoActionTypes.LoadMovimientosPorCuenta: {
      return {
        ...state,
        loading: true
      };
    }
    case MovimientoActionTypes.ReclasificarMovimientosFail:
    case MovimientoActionTypes.LoadMovimientosPorCuentaFail: {
      return {
        ...state,
        loading: false
      };
    }
    case MovimientoActionTypes.LoadMovimientosPorCuentaSuccess: {
      return adapter.addAll(action.payload.movimientos, {
        ...state,
        loading: false
      });
    }
    case MovimientoActionTypes.ReclasificarMovimientosSuccess: {
      return adapter.removeAll({
        ...state,
        loading: false
      });
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

export const getMovimientosLoading = (state: State) => state.loading;
