import * as fromActions from '../actions/auxiliar.actions';
import { AuxiliarActionTypes } from '../actions/auxiliar.actions';
import { Auxiliar } from 'app/saldos/models/auxiliar';
import { CuentaContable } from 'app/cuentas/models';

export interface State {
  registros: Auxiliar[];
  cuentaInicial: string;
  loading: boolean;
}

export const initialState = {
  loading: false,
  registros: [],
  cuentaInicial: undefined
};

export function reducer(
  state = initialState,
  action: fromActions.AuxiliarActions
): State {
  switch (action.type) {
    case AuxiliarActionTypes.LoadAuxiliar: {
      const cuentaInicial = action.payload.cuentaInicial;
      return {
        ...state,
        loading: true,
        cuentaInicial
      };
    }

    case AuxiliarActionTypes.LoadAuxiliarDeBancos: {
      return {
        ...state,
        loading: true
      };
    }
    case AuxiliarActionTypes.LoadAuxiliarFail:
    case AuxiliarActionTypes.LoadAuxiliarDeBancosFail: {
      return {
        ...state,
        loading: false
      };
    }

    case AuxiliarActionTypes.LoadAuxiliarSuccess:
    case AuxiliarActionTypes.LoadAuxiliarDeBancosSuccess: {
      return {
        ...state,
        registros: action.payload.movimientos,
        loading: false
      };
    }
    case AuxiliarActionTypes.CleanAuxiliar: {
      return {
        ...state,
        registros: []
      };
    }
    default:
      return {
        ...state
      };
  }
}

export const getAuxiliarLoading = (state: State) => state.loading;
export const getRegistros = (state: State) => state.registros;
export const getCuentaInicial = (state: State) => state.cuentaInicial;
