import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { AjusteConcepto } from '../../model';
import { AjusteConceptoActions, AjusteConceptoActionTypes } from '../actions';

export interface State extends EntityState<AjusteConcepto> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<AjusteConcepto> = createEntityAdapter<
  AjusteConcepto
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: AjusteConceptoActions
): State {
  switch (action.type) {
    case AjusteConceptoActionTypes.LoadConceptos:
    case AjusteConceptoActionTypes.UpdateConcepto:
    case AjusteConceptoActionTypes.DeleteConcepto:
    case AjusteConceptoActionTypes.CreateConcepto: {
      return {
        ...state,
        loading: true
      };
    }
    case AjusteConceptoActionTypes.LoadConceptosFail:
    case AjusteConceptoActionTypes.CreateConceptoFail:
    case AjusteConceptoActionTypes.UpdateConceptoFail:
    case AjusteConceptoActionTypes.DeleteConceptoFail: {
      return {
        ...state,
        loading: false
      };
    }

    case AjusteConceptoActionTypes.LoadConceptosSuccess: {
      return adapter.addAll(action.payload.conceptos, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case AjusteConceptoActionTypes.CreateConceptoSuccess:
    case AjusteConceptoActionTypes.UpdateConceptoSuccess: {
      return adapter.upsertOne(action.payload.concepto, {
        ...state,
        loading: false
      });
    }

    case AjusteConceptoActionTypes.DeleteConceptoSuccess: {
      return adapter.removeOne(action.payload.conceptoId, {
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
