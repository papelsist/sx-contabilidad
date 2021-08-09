import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { PolizaActionTypes, PolizaActions } from '../actions/poliza.actions';

import { Poliza, PolizasFilter } from '../../models';
import { PolizasPeriodoActionTypes } from 'app/econta/store';

// export const POLIZAS_STORAGE_KEY = 'contabilidad.polizas.period';

export interface State extends EntityState<Poliza> {
  loading: boolean;
  loaded: boolean;
  selectedId: number;
  filter: PolizasFilter;
  searchTerm: string;
}

function sortByFolio(e1: Poliza, e2: Poliza) {
  return e2.folio - e1.folio;
}

export const adapter: EntityAdapter<Poliza> = createEntityAdapter<Poliza>({
  sortComparer: sortByFolio
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  selectedId: undefined,
  filter: undefined,
  searchTerm: ''
});

export function reducer(state = initialState, action: PolizaActions): State {
  switch (action.type) {
    case PolizaActionTypes.CopiarPoliza:
    case PolizaActionTypes.ProrratearPartida:
    case PolizaActionTypes.GenerarComplementos:
    case PolizaActionTypes.GenerarFolios:
    case PolizaActionTypes.CerrarPoliza:
    case PolizaActionTypes.GenerarPolizas:
    case PolizaActionTypes.CreatePolizasEgreso:
    case PolizaActionTypes.RecalcularPoliza:
    case PolizaActionTypes.CreatePoliza:
    case PolizaActionTypes.UpdatePoliza:
    case PolizaActionTypes.DeletePoliza:
    case PolizaActionTypes.LoadPolizas: {
      return {
        ...state,
        loading: true
      };
    }

    case PolizaActionTypes.CopiarPolizaFail:
    case PolizaActionTypes.ProrratearPartidaFail:
    case PolizaActionTypes.GenerarComplementosFail:
    case PolizaActionTypes.GenerarFoliosFail:
    case PolizaActionTypes.GenerarPolizasFail:
    case PolizaActionTypes.CerrarPolizaFail:
    case PolizaActionTypes.CreatePolizasEgresoFail:
    case PolizaActionTypes.RecalcularPolizaFail:
    case PolizaActionTypes.CreatePolizaFail:
    case PolizaActionTypes.DeletePolizaFail:
    case PolizaActionTypes.UpdatePolizaFail:
    case PolizaActionTypes.LoadPolizasFail: {
      return {
        ...state,
        loading: false
      };
    }

    case PolizaActionTypes.LoadPolizasSuccess: {
      return adapter.addAll(action.payload.polizas, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case PolizaActionTypes.CopiarPolizaSuccess:
    case PolizaActionTypes.CerrarPolizaSuccess:
    case PolizaActionTypes.RecalcularPolizaSuccess:
    case PolizaActionTypes.UpsertPoliza:
    case PolizaActionTypes.UpdatePolizaSuccess:
    case PolizaActionTypes.CreatePolizaSuccess: {
      return adapter.upsertOne(action.payload.poliza, {
        ...state,
        loading: false
      });
    }

    case PolizaActionTypes.DeletePolizaSuccess: {
      return adapter.removeOne(action.payload.poliza.id, {
        ...state,
        loading: false
      });
    }

    case PolizaActionTypes.SetPolizasFilter: {
      return {
        ...state,
        filter: action.payload.filter
      };
    }

    case PolizaActionTypes.GenerarFoliosSuccess:
    case PolizaActionTypes.GenerarPolizasSuccess:
    case PolizaActionTypes.CreatePolizasEgresoSuccess: {
      return adapter.upsertMany(action.payload.polizas, {
        ...state,
        loading: false
      });
    }

    case PolizaActionTypes.SetPolizasSearchTerm: {
      return {
        ...state,
        searchTerm: action.payload.term
      };
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

export const getPolizasLoaded = (state: State) => state.loaded;
export const getPolizasLoading = (state: State) => state.loading;
export const getSelectedPolizaId = (state: State) => state.selectedId;
export const getPolizasFilter = (state: State) => state.filter;
export const getPolizasSearchTerm = (state: State) => state.searchTerm;
