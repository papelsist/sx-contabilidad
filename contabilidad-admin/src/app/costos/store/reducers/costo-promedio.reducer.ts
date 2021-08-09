import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { CostoPromedio } from '../../models';
import {
  CostosActions,
  CostoActionTypes
} from '../actions/costo-promedio.actions';

export interface State extends EntityState<CostoPromedio> {
  loading: boolean;
  loaded: boolean;
  periodo: { ejercicio: number; mes: number };
  selectedId: number;
}

export const adapter: EntityAdapter<CostoPromedio> = createEntityAdapter<
  CostoPromedio
>({
  sortComparer: (costoA, costoB) => costoA.clave.localeCompare(costoB.clave)
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  periodo: { ejercicio: 2018, mes: 1 }, // Periodo.getEjercicioMes(),
  selectedId: undefined
});

export function reducer(state = initialState, action: CostosActions): State {
  switch (action.type) {
    case CostoActionTypes.SetPeriodoDeCostos: {
      const periodo = action.payload.periodo;
      return adapter.removeAll({
        ...state,
        periodo,
        loaded: false
      });
    }

    case CostoActionTypes.LoadCostosFail: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case CostoActionTypes.AplicarCostoPromedioFail:
    case CostoActionTypes.CalculoDeCostoPromedioFail: {
      return {
        ...state,
        loading: false
      };
    }

    case CostoActionTypes.LoadCostosSuccess: {
      return adapter.addAll(action.payload.costos, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case CostoActionTypes.AplicarCostoPromedio:
    case CostoActionTypes.CalculoDeCostoPromedio:
    case CostoActionTypes.LoadCostos: {
      return {
        ...state,
        loading: true
      };
    }

    case CostoActionTypes.CalculoDeCostoPromedioSuccess: {
      const costos = action.payload.costos;
      return adapter.upsertMany(costos, {
        ...state,
        loading: false
      });
    }

    case CostoActionTypes.AplicarCostoPromedioSuccess: {
      return {
        ...state,
        loading: false
      };
    }

    case CostoActionTypes.SetSelectedCosto: {
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
