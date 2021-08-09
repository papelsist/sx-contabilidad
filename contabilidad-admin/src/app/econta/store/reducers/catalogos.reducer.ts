import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import {
  CatalogosActionTypes,
  CatalogosActions
} from "../actions/catalogos.actions";

import { Catalogo, Empresa } from "../../models";

export interface State extends EntityState<Catalogo> {
  loading: boolean;
  loaded: boolean;
  empresa: Empresa | null;
}

export const adapter: EntityAdapter<Catalogo> = createEntityAdapter<Catalogo>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  empresa: null
});

export function reducer(state = initialState, action: CatalogosActions): State {
  switch (action.type) {
    case CatalogosActionTypes.GenerarCatalogo:
    case CatalogosActionTypes.LoadCatalogos: {
      return {
        ...state,
        loading: true
      };
    }
    case CatalogosActionTypes.GenerarCatalogoFail:
    case CatalogosActionTypes.LoadCatalogosFail: {
      return {
        ...state,
        loading: false
      };
    }

    case CatalogosActionTypes.LoadCatalogosSuccess: {
      return adapter.addAll(action.payload.catalogos, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case CatalogosActionTypes.UpserCatalogo: {
      return adapter.upsertOne(action.payload.catalogo, {
        ...state
      });
    }

    case CatalogosActionTypes.GenerarCatalogoSuccess: {
      return adapter.upsertOne(action.payload.catalogo, {
        ...state,
        loading: false
      });
    }

    case CatalogosActionTypes.SetEmpresa: {
      return {
        ...state,
        empresa: action.payload.empresa
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

export const getCatalogosLoaded = (state: State) => state.loaded;
export const getCatalogosLoading = (state: State) => state.loading;
export const getCatalogosEmpresa = (state: State) => state.empresa;
