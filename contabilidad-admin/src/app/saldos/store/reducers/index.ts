import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromSaldos from './saldos.reducer';
import * as fromMovimientos from './movimientos.reducer';
import * as fromDiot from './diot.reducer';
import * as fromAuxiliar from './auxiliar.reducer';
import * as fromPagoIsr from './pago-isr.reducer';
import * as fromBalanza from './balanza.reducer';

export interface State {
  saldos: fromSaldos.State;
  movimientos: fromMovimientos.State;
  diot: fromDiot.State;
  auxiliar: fromAuxiliar.State;
  pagoIsr: fromPagoIsr.State;
  balanza: fromBalanza.State;
}

export const reducers: ActionReducerMap<State> = {
  saldos: fromSaldos.reducer,
  movimientos: fromMovimientos.reducer,
  diot: fromDiot.reducer,
  auxiliar: fromAuxiliar.reducer,
  pagoIsr: fromPagoIsr.reducer,
  balanza: fromBalanza.reducer
};

export const getState = createFeatureSelector<State>('saldos');
