import { Action } from '@ngrx/store';
import { BajaDeActivo } from 'app/activo-fijo/models/baja-de-activo';
import { Update } from '@ngrx/entity';

import { Periodo } from 'app/_core/models/periodo';

export enum BajaActionTypes {
  LoadBajas = '[Bajas Component] Load Bajas ',
  LoadBajasSuccess = '[Bajas API] Load Bajas  Success',
  LoadBajasFail = '[Bajas API] Load Bajas  Fail',

  // Registrar Baja
  RegistrarBaja = '[Bajas component] Registrar baja',
  RegistrarBajaFail = '[Bajas component] Registrar baja fail',
  RegistrarBajaSuccess = '[Bajas component] Registrar baja success',

  // Cancelar Baja
  CancelarBaja = '[Bajas component] Cancelar baja',
  CancelarBajaFail = '[Bajas component] Cancelar baja fail',
  CancelarBajaSuccess = '[Bajas component] Cancelar baja success',
}

// Load
export class LoadBajas implements Action {
  readonly type = BajaActionTypes.LoadBajas;
  constructor(public payload: {periodo: Periodo}) {}
}
export class LoadActivoFail implements Action {
  readonly type = BajaActionTypes.LoadBajasFail;

  constructor(public payload: { response: any }) {}
}
export class LoadActivoSuccess implements Action {
  readonly type = BajaActionTypes.LoadBajasSuccess;
  constructor(public payload: { activos: BajaDeActivo[] }) {}
}
// Registrar baja
export class RegistrarBaja implements Action {
  readonly type = BajaActionTypes.RegistrarBaja;
  constructor(public payload: {activo: Update<BajaDeActivo>}) {}
}
export class RegistrarBajaFail implements Action {
  readonly type = BajaActionTypes.RegistrarBajaFail;
  constructor( public payload: {response: any}) {}
}
export class RegistrarBajaSuccess implements Action {
  readonly type = BajaActionTypes.RegistrarBajaSuccess;
  constructor (public payload: {activo: BajaDeActivo}) {}
}

// Cancelar baja
export class CancelarBaja implements Action {
  readonly type = BajaActionTypes.CancelarBaja;
  constructor(public payload: {activoId: number}) {}
}
export class CancelarBajaFail implements Action {
  readonly type = BajaActionTypes.CancelarBajaFail;
  constructor( public payload: {response: any}) {}
}
export class CancelarBajaSuccess implements Action {
  readonly type = BajaActionTypes.CancelarBajaSuccess;
  constructor (public payload: {activo: BajaDeActivo}) {}
}

export type ActivosActions =
  | LoadBajas
  | LoadActivoFail
  | LoadActivoSuccess
  | RegistrarBaja
  | RegistrarBajaFail
  | RegistrarBajaSuccess
  | CancelarBaja
  | CancelarBajaFail
  | CancelarBajaSuccess;
