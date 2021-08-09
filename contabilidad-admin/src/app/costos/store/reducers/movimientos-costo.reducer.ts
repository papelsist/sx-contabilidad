import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  MovmientosCostoActions,
  MovimientosCostoActionTypes
} from '../actions/movimientos-costo.actions';
import { loadEjercicioMesFromStorage } from 'app/models/ejercicio-mes';

export interface State extends EntityState<any> {
  loading: boolean;
  loaded: boolean;
  periodo: { ejercicio: number; mes: number };
  selectedId: string;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: producto => producto.clave,
  sortComparer: (productoA, productoB) =>
    productoA.clave.localeCompare(productoB.clave)
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  periodo: loadEjercicioMesFromStorage('sx.costos.movimientos.periodo'),
  selectedId: undefined
});

export function reducer(
  state = initialState,
  action: MovmientosCostoActions
): State {
  switch (action.type) {
    case MovimientosCostoActionTypes.SetPeriodoDeMovmientosCosto: {
      const periodo = action.payload.periodo;
      return adapter.removeAll({
        ...state,
        periodo,
        loaded: false
      });
    }
    case MovimientosCostoActionTypes.LoadMovmientosCosto: {
      return {
        ...state,
        loading: true
      };
    }
    case MovimientosCostoActionTypes.LoadMovmientosCostoFail: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case MovimientosCostoActionTypes.LoadMovmientosCostoSuccess: {
      return adapter.addAll(action.payload.registros, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case MovimientosCostoActionTypes.SelectCurrentProducto: {
      const selectedId = action.payload.selected;
      return {
        ...state,
        selectedId
      };
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

export const getCostosLoading = (state: State) => state.loading;
export const getCostosLoaded = (state: State) => state.loaded;
export const getPeriodoDeCosto = (state: State) => state.periodo;
export const getSelectedCostoId = (state: State) => state.selectedId;
