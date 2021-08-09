import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as fromActions from '../actions/pago-isr.actions';
import { PagoIsrActionTypes } from '../actions/pago-isr.actions';
import { PagoIsr } from 'app/saldos/models';

export interface State extends EntityState<PagoIsr> {
  loading: boolean;
}

export const adapter: EntityAdapter<PagoIsr> = createEntityAdapter();

export const initialState = adapter.getInitialState({
  loading: false
});

export function reducer(
  state = initialState,
  action: fromActions.PagoIsrActions
): State {
  switch (action.type) {
    case PagoIsrActionTypes.GenerarPagoIsr:
    case PagoIsrActionTypes.LoadPagoIsr: {
      return {
        ...state,
        loading: true
      };
    }
    case PagoIsrActionTypes.GenerarPagoIsrFail:
    case PagoIsrActionTypes.LoadPagoIsrFail: {
      return {
        ...state,
        loading: false
      };
    }

    case PagoIsrActionTypes.GenerarPagoIsrSuccess:
    case PagoIsrActionTypes.LoadPagoIsrSuccess: {
      return adapter.addAll(action.payload.rows, {
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

export const getLoading = (state: State) => state.loading;
