import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  PolizasPeriodoActionTypes,
  PolizasPeriodoActions
} from '../actions/polizas-periodo.actions';

import { PolizasPeriodo } from '../../models';

export interface State extends EntityState<PolizasPeriodo> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<PolizasPeriodo> = createEntityAdapter<
  PolizasPeriodo
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: PolizasPeriodoActions
): State {
  switch (action.type) {
    case PolizasPeriodoActionTypes.DeletePolizasPeriodo:
    case PolizasPeriodoActionTypes.GenerarPolizasPeriodo:
    case PolizasPeriodoActionTypes.LoadPolizasPeriodo: {
      return {
        ...state,
        loading: true
      };
    }
    case PolizasPeriodoActionTypes.DeletePolizasPeriodoFail:
    case PolizasPeriodoActionTypes.GenerarPolizasPeriodoFail:
    case PolizasPeriodoActionTypes.LoadPolizasPeriodoFail: {
      return {
        ...state,
        loading: false
      };
    }

    case PolizasPeriodoActionTypes.LoadPolizasPeriodoSuccess: {
      return adapter.addAll(action.payload.polizasPeriodo, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case PolizasPeriodoActionTypes.UpsertPolizasPeriodo: {
      return adapter.upsertOne(action.payload.polizasPeriodo, {
        ...state
      });
    }

    case PolizasPeriodoActionTypes.GenerarPolizasPeriodoSuccess: {
      return adapter.upsertOne(action.payload.polizasPeriodo, {
        ...state,
        loading: false
      });
    }

    case PolizasPeriodoActionTypes.DeletePolizasPeriodoSuccess: {
      return adapter.removeOne(action.payload.polizasPeriodo.id, {
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

export const getPolizasPeriodoLoaded = (state: State) => state.loaded;
export const getPolizasPeriodoLoading = (state: State) => state.loading;
