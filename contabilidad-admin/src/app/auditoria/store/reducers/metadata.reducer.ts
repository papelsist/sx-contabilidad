import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  MetadataActionTypes,
  MetadataActions
} from '../actions/metadata.actions';
import { SatMetadata } from 'app/auditoria/models';
import { loadEjercicioMesFromStorage } from 'app/models/ejercicio-mes';

export const METADATA_STORE_KEY = 'sx.contabilidad.sat.metadata';

export interface State extends EntityState<SatMetadata> {
  loading: boolean;
  loaded: boolean;
  filter: any;
}

export const adapter: EntityAdapter<SatMetadata> = createEntityAdapter<
  SatMetadata
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  filter: loadEjercicioMesFromStorage(METADATA_STORE_KEY)
});

export function reducer(state = initialState, action: MetadataActions): State {
  switch (action.type) {
    case MetadataActionTypes.SetMetadataFilter: {
      return {
        ...state,
        filter: action.payload.filter
      };
    }

    case MetadataActionTypes.ImportarMetadata:
    case MetadataActionTypes.LoadMetadata: {
      return {
        ...state,
        filter: action.payload.filter,
        loading: true
      };
    }
    case MetadataActionTypes.ImportarMetadataFail:
    case MetadataActionTypes.LoadMetadataFail: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case MetadataActionTypes.LoadMetadataSuccess: {
      return adapter.addAll(action.payload.data, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case MetadataActionTypes.ImportarMetadataSuccess: {
      return adapter.removeAll({
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

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getFilter = (state: State) => state.filter;
