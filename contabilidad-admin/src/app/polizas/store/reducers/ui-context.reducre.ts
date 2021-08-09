import {
  EjercicioMes,
  loadEjercicioMesFromStorage
} from '../../../models/ejercicio-mes';
import { UIContextActionTypes } from '../actions/ui-context.actions';
import * as fromActions from '../actions/ui-context.actions';
import { Grupo } from './grupo';
import { POLIZAS_2018 } from './polizas-2018';
import { POLIZAS_2019 } from './polizas-2019';

export const POLIZAS_STORAGE_KEY = 'contabilidad.polizas.periodo';

export interface State {
  periodo: EjercicioMes;
  grupos: Grupo[];
}

export const initialState: State = {
  periodo: loadEjercicioMesFromStorage(POLIZAS_STORAGE_KEY),
  grupos: []
};

export function reducer(
  state = initialState,
  action: fromActions.UIContextActions
): State {
  switch (action.type) {
    case UIContextActionTypes.SetPeriodoDePoliza: {
      return {
        ...state,
        periodo: action.payload.periodo
      };
    }

    case UIContextActionTypes.SetMenuContext: {
      const ejercicio = action.payload.ejercicio;
      const grupos = ejercicio < 2019 ? POLIZAS_2018 : POLIZAS_2019;
      return {
        ...state,
        grupos
      };
    }
  }
  return state;
}

export const getGrupos = (state: State) => state.grupos;
export const getPeriodo = (state: State) => state.periodo;
