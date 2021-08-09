import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as fromActions from './aplicacion-de-corte.actions';
import { AplicacionDeCorteActionTypes } from './aplicacion-de-corte.actions';
import { CorteDeTarjetaAplicacion } from '../models';

import * as moment from 'moment';

export interface State extends EntityState<CorteDeTarjetaAplicacion> {
  loading: boolean;
  loaded: boolean;
}
export const adapter: EntityAdapter<
  CorteDeTarjetaAplicacion
> = createEntityAdapter<CorteDeTarjetaAplicacion>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: fromActions.AplicacionDeCorteActions
): State {
  switch (action.type) {
    case AplicacionDeCorteActionTypes.LoadAplicacionesDeCorte: {
      return {
        ...state,
        loading: true
      };
    }

    case AplicacionDeCorteActionTypes.UpdateAplicacionDeCorteFail:
    case AplicacionDeCorteActionTypes.LoadAplicacionesDeCorteFail: {
      return {
        ...state,
        loading: false
      };
    }

    case AplicacionDeCorteActionTypes.LoadAplicacionesDeCorteSuccess: {
      return adapter.addAll(action.payload.aplicaciones, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case AplicacionDeCorteActionTypes.UpdateAplicacionDeCorteSuccess: {
      return adapter.upsertOne(action.payload.aplicacion, {
        ...state,
        loading: false,
        loaded: true
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

export const getAplicacionDeCorteLoading = (state: State) => state.loading;
export const getAplicacionDeCorteLoaded = (state: State) => state.loaded;
