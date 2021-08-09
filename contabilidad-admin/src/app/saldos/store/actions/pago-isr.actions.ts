import { Action } from '@ngrx/store';

import { PagoIsr } from '../../models';
import { EjercicioMes } from '../../../models/ejercicio-mes';

export enum PagoIsrActionTypes {
  LoadPagoIsr = '[PagoIsr Component] Load PAGO ISR',
  LoadPagoIsrSuccess = '[PagoIsr API] Load PAGO ISR Success',
  LoadPagoIsrFail = '[PagoIsr API] Load PAGO ISR Fail',
  // Genera
  GenerarPagoIsr = '[PagoIsr Component] Generar PAGO ISR',
  GenerarPagoIsrSuccess = '[PagoIsr API] Generar PAGO ISR Success',
  GenerarPagoIsrFail = '[PagoIsr API] Generar PAGO ISR Fail'
}

// Load
export class LoadPagoIsr implements Action {
  readonly type = PagoIsrActionTypes.LoadPagoIsr;
  constructor(public payload: { periodo: EjercicioMes }) {}
}
export class LoadPagoIsrFail implements Action {
  readonly type = PagoIsrActionTypes.LoadPagoIsrFail;

  constructor(public payload: { response: any }) {}
}
export class LoadPagoIsrSuccess implements Action {
  readonly type = PagoIsrActionTypes.LoadPagoIsrSuccess;
  constructor(public payload: { rows: PagoIsr[] }) {}
}

// Generar
export class GenerarPagoIsr implements Action {
  readonly type = PagoIsrActionTypes.GenerarPagoIsr;
  constructor(public payload: { periodo: EjercicioMes; params: any }) {}
}
export class GenerarPagoIsrFail implements Action {
  readonly type = PagoIsrActionTypes.GenerarPagoIsrFail;

  constructor(public payload: { response: any }) {}
}
export class GenerarPagoIsrSuccess implements Action {
  readonly type = PagoIsrActionTypes.GenerarPagoIsrSuccess;
  constructor(public payload: { rows: PagoIsr[] }) {}
}

export type PagoIsrActions =
  | LoadPagoIsr
  | LoadPagoIsrFail
  | LoadPagoIsrSuccess
  | GenerarPagoIsr
  | GenerarPagoIsrFail
  | GenerarPagoIsrSuccess;
