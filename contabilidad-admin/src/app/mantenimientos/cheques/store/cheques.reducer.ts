import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ChequeActions, ChequeActionTypes } from './cheque.actions';
import { createChequesFilter, ChequesFilter, Cheque } from '../models/cheque';

export interface State extends EntityState<Cheque> {
  loading: boolean;
  loaded: boolean;
  filter: ChequesFilter;
  term: string;
}

export const adapter: EntityAdapter<Cheque> = createEntityAdapter<Cheque>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  filter: createChequesFilter(),
  term: ''
});

export function reducer(state = initialState, action: ChequeActions): State {
  switch (action.type) {
    case ChequeActionTypes.SetChequesFilter: {
      const filter = action.payload.filter;
      return {
        ...state,
        filter
      };
    }
    case ChequeActionTypes.SetChequesSearchTerm: {
      const term = action.payload.term;
      return {
        ...state,
        term
      };
    }

    case ChequeActionTypes.LoadCheques: {
      return {
        ...state,
        loading: true
      };
    }

    case ChequeActionTypes.UpdateChequeFail:
    case ChequeActionTypes.LoadChequesFail: {
      return {
        ...state,
        loading: false
      };
    }
    case ChequeActionTypes.LoadChequesSuccess: {
      return adapter.addAll(action.payload.cheques, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case ChequeActionTypes.UpdateChequeSuccess: {
      const cheque = action.payload.cheque;
      return adapter.updateOne(
        {
          id: cheque.id,
          changes: cheque
        },
        {
          ...state,
          loading: false
        }
      );
    }

    case ChequeActionTypes.UpsertCheque: {
      return adapter.upsertOne(action.payload.Cheque, {
        ...state,
        loading: false
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

export const getChequesLoading = (state: State) => state.loading;
export const getChequesLoaded = (state: State) => state.loaded;
export const getChequesFilter = (state: State) => state.filter;
export const getChequesSearchTerm = (state: State) => state.term;
