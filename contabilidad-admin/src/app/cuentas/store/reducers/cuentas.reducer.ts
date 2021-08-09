import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { CuentaActionTypes, CuentaActions } from '../actions/cuentas.actions';

import { CuentaContable, CatalogoFilter } from '../../models';

export interface State extends EntityState<CuentaContable> {
  loading: boolean;
  loaded: boolean;
  searchTerm: string;
  selectedId: number;
  filter: CatalogoFilter;
}

export const adapter: EntityAdapter<CuentaContable> = createEntityAdapter<
  CuentaContable
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  searchTerm: '',
  selectedId: undefined,
  filter: { registros: 100, mayor: true }
});

export function reducer(state = initialState, action: CuentaActions): State {
  switch (action.type) {
    case CuentaActionTypes.CreateCuenta:
    case CuentaActionTypes.UpdateCuenta:
    case CuentaActionTypes.DeleteCuenta:
    case CuentaActionTypes.LoadCuentas: {
      return {
        ...state,
        loading: true
      };
    }

    case CuentaActionTypes.CreateCuentaFail:
    case CuentaActionTypes.DeleteCuentaFail:
    case CuentaActionTypes.UpdateCuentaFail:
    case CuentaActionTypes.LoadCuentasFail: {
      return {
        ...state,
        loading: false
      };
    }

    case CuentaActionTypes.LoadCuentasSuccess: {
      return adapter.addAll(action.payload.cuentas, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case CuentaActionTypes.UpsertCuenta:
    case CuentaActionTypes.UpdateCuentaSuccess:
    case CuentaActionTypes.CreateCuentaSuccess: {
      return adapter.upsertOne(action.payload.cuenta, {
        ...state,
        loading: false
      });
    }

    case CuentaActionTypes.DeleteCuentaSuccess: {
      return adapter.removeOne(action.payload.cuenta.id, {
        ...state,
        loading: false
      });
    }

    case CuentaActionTypes.SetCuentasSearchTerm: {
      return {
        ...state,
        searchTerm: action.payload.term
      };
    }
    case CuentaActionTypes.SetSelectedCuenta: {
      return {
        ...state,
        selectedId: action.payload.selectedId
      };
    }

    case CuentaActionTypes.SetCatalogoFilter: {
      return {
        ...state,
        filter: action.payload.filter
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

export const getCuentasLoaded = (state: State) => state.loaded;
export const getCuentasLoading = (state: State) => state.loading;
export const getCuentasSearchTerm = (state: State) => state.searchTerm;
export const getSelectedCuentaId = (state: State) => state.selectedId;
export const getCatalogosFilter = (state: State) => state.filter;
