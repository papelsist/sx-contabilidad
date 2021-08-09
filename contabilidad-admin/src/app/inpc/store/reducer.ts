import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Inpc } from '../models/inpc';
import { InpcActionTypes, InpcActions } from './actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<Inpc> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Inpc> = createEntityAdapter<Inpc>({
  sortComparer: (itemA, itemB) => {
    if (itemA.ejercicio !== itemB.ejercicio) {
      return itemB.ejercicio
        .toString()
        .localeCompare(itemA.ejercicio.toString());
    } else {
      return itemA.mes.toString().localeCompare(itemB.mes.toString());
    }
  }
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(state = initialState, action: InpcActions): State {
  switch (action.type) {
    case InpcActionTypes.DeleteInpc:
    case InpcActionTypes.UpdateInpc:
    case InpcActionTypes.CreateInpc:
    case InpcActionTypes.LoadInpcs: {
      return {
        ...state,
        loading: true
      };
    }

    case InpcActionTypes.DeleteInpcFail:
    case InpcActionTypes.UpdateInpcFail:
    case InpcActionTypes.CreateInpcFail:
    case InpcActionTypes.LoadInpcsFail: {
      return {
        ...state,
        loading: false
      };
    }

    case InpcActionTypes.LoadInpcsSuccess: {
      return adapter.addAll(action.payload.inpcs, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case InpcActionTypes.CreateInpcSuccess: {
      return adapter.addOne(action.payload.inpc, {
        ...state,
        loading: false
      });
    }

    case InpcActionTypes.UpdateInpcSuccess: {
      return adapter.upsertOne(action.payload.inpc, {
        ...state,
        loading: false
      });
    }
    case InpcActionTypes.DeleteInpcSuccess: {
      return adapter.removeOne(action.payload.id, {
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

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getInpcState = createFeatureSelector<State>('inpc');
