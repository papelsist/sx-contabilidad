import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  AuditoriaCfdiActionTypes,
  AuditoriaCfdiActions
} from '../actions/auditoria-cfdi.actions';
import { AuditoriaFiscalCfdi } from 'app/auditoria/models';
import { loadEjercicioMesFromStorage } from 'app/models/ejercicio-mes';

export const AUDITORIA_CFDI_STORE_KEY = 'sx.contabilidad.sat.auditoria-cfdi';

export interface State extends EntityState<AuditoriaFiscalCfdi> {
  loading: boolean;
  loaded: boolean;
  filter: any;
}

export const adapter: EntityAdapter<AuditoriaFiscalCfdi> = createEntityAdapter<
  AuditoriaFiscalCfdi
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  filter: loadEjercicioMesFromStorage(AUDITORIA_CFDI_STORE_KEY)
});

export function reducer(
  state = initialState,
  action: AuditoriaCfdiActions
): State {
  switch (action.type) {
    case AuditoriaCfdiActionTypes.SetAuditoriaCfdiFilter: {
      return {
        ...state,
        filter: action.payload.filter
      };
    }

    case AuditoriaCfdiActionTypes.GenerarAuditoriaCfdi:
    case AuditoriaCfdiActionTypes.LoadAuditoriaCfdi: {
      return {
        ...state,
        filter: action.payload.filter,
        loading: true
      };
    }
    case AuditoriaCfdiActionTypes.GenerarAuditoriaCfdiFail:
    case AuditoriaCfdiActionTypes.LoadAuditoriaCfdiFail: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case AuditoriaCfdiActionTypes.GenerarAuditoriaCfdiSuccess:
    case AuditoriaCfdiActionTypes.LoadAuditoriaCfdiSuccess: {
      return adapter.addAll(action.payload.data, {
        ...state,
        loading: false,
        loaded: true
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
