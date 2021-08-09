import { Action } from '@ngrx/store';
import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';
import { Update } from '@ngrx/entity';
import { EjercicioMes } from 'app/models/ejercicio-mes';

export enum ActivoActionTypes {
  LoadActivos = '[Activos Component] Load Activos ',
  LoadActivosSuccess = '[Activos API] Load Activos  Success',
  LoadActivosFail = '[Activos API] Load Activos  Fail',

  // Create
  CreateActivo = '[Create Activo Component] Create Activo',
  CreateActivoFail = '[Activo Effects] Create Activo fail',
  CreateActivoSuccess = '[Activo Effects] Create Activo success',

  // Update
  UpdateActivo = '[EditActivo component] Update activo',
  UpdateActivoFail = '[EditActivo component] Update activo fail',
  UpdateActivoSuccess = '[EditActivo component] Update activo success',

  UpsertActivo = '[Activo exists guard] Upsert Activo fijo',

  // Delete
  DeleteActivo = '[EditActivo component] Delete activo',
  DeleteActivoFail = '[EditActivo component] Delete activo fail',
  DeleteActivoSuccess = '[EditActivo component] Delete activo success',

  // Generacion de pendientes
  GenerarPendientes = '[ActivoFijos component ] Generar pendientes',
  GenerarPendientesFail = '[ActivoFijos component ] Generar pendientes fail',
  GenerarPendientesSuccess = '[ActivoFijos component ] Generar pendientes success',

  // Depreciacion BATCH
  GenerarDepreciacionBatch = '[Activos component ] Generar depreciacion batch',
  GenerarDepreciacionBatchFail = '[Activos component ] Generar depreciacion batch fail',
  GenerarDepreciacionBatchSuccess = '[Activos component ] Generar depreciacion batch success',

  // Asignar INPC medio mes
  AsignarInpc = '[Activos component] Asignar INPC a activos',
  AsignarInpcFail = '[Activos component] Asignar INPC a activos fail',
  AsignarInpcSuccess = '[Activos component] Asignar INPC a activos success',

  // Depreciacion fiscal
  GenerarDepreciacionFiscalBatch = '[Activos component] Generar depreciacion fiscal batch',
  GenerarDepreciacionFiscalBatchFail = '[Activos component] Generar depreciacion fiscal batch fail',
  GenerarDepreciacionFiscalBatchSuccess = '[Activos component] Generar depreciacion fiscal batch success',

  // Registrar Baja
  RegistrarBaja = '[Bajas component] Registrar baja',
  RegistrarBajaFail = '[Bajas component] Registrar baja fail',
  RegistrarBajaSuccess = '[Bajas component] Registrar baja success',

  // Cancelar Baja
  CancelarBaja = '[Bajas component] Cancelar baja',
  CancelarBajaFail = '[Bajas component] Cancelar baja fail',
  CancelarBajaSuccess = '[Bajas component] Cancelar baja success'
}

// Load
export class LoadActivos implements Action {
  readonly type = ActivoActionTypes.LoadActivos;
}
export class LoadActivoFail implements Action {
  readonly type = ActivoActionTypes.LoadActivosFail;

  constructor(public payload: { response: any }) {}
}
export class LoadActivoSuccess implements Action {
  readonly type = ActivoActionTypes.LoadActivosSuccess;
  constructor(public payload: { activos: ActivoFijo[] }) {}
}

// Create
export class CreateActivo implements Action {
  readonly type = ActivoActionTypes.CreateActivo;
  constructor(public payload: { activo: Partial<ActivoFijo> }) {}
}
export class CreateActivoFail implements Action {
  readonly type = ActivoActionTypes.CreateActivoFail;
  constructor(public payload: { response: any }) {}
}
export class CreateActivoSuccess implements Action {
  readonly type = ActivoActionTypes.CreateActivoSuccess;
  constructor(public payload: { activo: ActivoFijo }) {}
}

// Update activo
export class UpdateActivo implements Action {
  readonly type = ActivoActionTypes.UpdateActivo;
  constructor(public payload: { activo: Update<ActivoFijo> }) {}
}
export class UpdateActivoFail implements Action {
  readonly type = ActivoActionTypes.UpdateActivoFail;
  constructor(public payload: { response: any }) {}
}
export class UpdateActivoSuccess implements Action {
  readonly type = ActivoActionTypes.UpdateActivoSuccess;
  constructor(public payload: { activo: ActivoFijo }) {}
}

// Upasert entity
export class UpsertActivo implements Action {
  readonly type = ActivoActionTypes.UpsertActivo;
  constructor(public payload: { activo: ActivoFijo }) {}
}

// Delete activo
export class DeleteActivo implements Action {
  readonly type = ActivoActionTypes.DeleteActivo;
  constructor(public payload: { activo: ActivoFijo }) {}
}
export class DeleteActivoFail implements Action {
  readonly type = ActivoActionTypes.DeleteActivoFail;
  constructor(public payload: { response: any }) {}
}
export class DeleteActivoSuccess implements Action {
  readonly type = ActivoActionTypes.DeleteActivoSuccess;
  constructor(public payload: { activo: ActivoFijo }) {}
}

// Generar pendientes
export class GenerarPendientes implements Action {
  readonly type = ActivoActionTypes.GenerarPendientes;
}
export class GenerarPendientesFail implements Action {
  readonly type = ActivoActionTypes.GenerarPendientesFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarPendientesSuccess implements Action {
  readonly type = ActivoActionTypes.GenerarPendientesSuccess;
  constructor(public payload: { activos: ActivoFijo[] }) {}
}

// Generar depreciacion BATCH
export class GenerarDepreciacionBatch implements Action {
  readonly type = ActivoActionTypes.GenerarDepreciacionBatch;
  constructor(public payload: { periodo: EjercicioMes }) {}
}
export class GenerarDepreciacionBatchFail implements Action {
  readonly type = ActivoActionTypes.GenerarDepreciacionBatchFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarDepreciacionBatchSuccess implements Action {
  readonly type = ActivoActionTypes.GenerarDepreciacionBatchSuccess;
  constructor(public payload: { activos: ActivoFijo[] }) {}
}

// Asignacion de INPC
export class AsignarInpc implements Action {
  readonly type = ActivoActionTypes.AsignarInpc;
  constructor(public payload: { ids: number[]; inpc: number }) {}
}
export class AsignarInpcFail implements Action {
  readonly type = ActivoActionTypes.AsignarInpcFail;
  constructor(public payload: { response: any }) {}
}
export class AsignarInpcSuccess implements Action {
  readonly type = ActivoActionTypes.AsignarInpcSuccess;
  constructor(public payload: { activos: ActivoFijo[] }) {}
}

// Generar depreciacion fiscal BATCH
export class GenerarDepreciacionFiscalBatch implements Action {
  readonly type = ActivoActionTypes.GenerarDepreciacionFiscalBatch;
  constructor(public payload: { ejercicio: number }) {}
}
export class GenerarDepreciacionFiscalBatchFail implements Action {
  readonly type = ActivoActionTypes.GenerarDepreciacionFiscalBatchFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarDepreciacionFiscalBatchSuccess implements Action {
  readonly type = ActivoActionTypes.GenerarDepreciacionFiscalBatchSuccess;
  constructor(public payload: { activos: ActivoFijo[] }) {}
}

// Registrar baja
export class RegistrarBaja implements Action {
  readonly type = ActivoActionTypes.RegistrarBaja;
  constructor(public payload: { activo: Update<ActivoFijo> }) {}
}
export class RegistrarBajaFail implements Action {
  readonly type = ActivoActionTypes.RegistrarBajaFail;
  constructor(public payload: { response: any }) {}
}
export class RegistrarBajaSuccess implements Action {
  readonly type = ActivoActionTypes.RegistrarBajaSuccess;
  constructor(public payload: { activo: ActivoFijo }) {}
}

// Cancelar baja
export class CancelarBaja implements Action {
  readonly type = ActivoActionTypes.CancelarBaja;
  constructor(public payload: { activoId: number }) {}
}
export class CancelarBajaFail implements Action {
  readonly type = ActivoActionTypes.CancelarBajaFail;
  constructor(public payload: { response: any }) {}
}
export class CancelarBajaSuccess implements Action {
  readonly type = ActivoActionTypes.CancelarBajaSuccess;
  constructor(public payload: { activo: ActivoFijo }) {}
}

export type ActivosActions =
  | LoadActivos
  | LoadActivoFail
  | LoadActivoSuccess
  | CreateActivo
  | CreateActivoFail
  | CreateActivoSuccess
  | UpdateActivo
  | UpdateActivoFail
  | UpdateActivoSuccess
  | UpsertActivo
  | GenerarPendientes
  | GenerarPendientesFail
  | GenerarPendientesSuccess
  | GenerarDepreciacionBatch
  | GenerarDepreciacionBatchFail
  | GenerarDepreciacionBatchSuccess
  | AsignarInpc
  | AsignarInpcFail
  | AsignarInpcSuccess
  | GenerarDepreciacionFiscalBatch
  | GenerarDepreciacionFiscalBatchFail
  | GenerarDepreciacionFiscalBatchSuccess
  | RegistrarBaja
  | RegistrarBajaFail
  | RegistrarBajaSuccess
  | CancelarBaja
  | CancelarBajaFail
  | CancelarBajaSuccess
  | DeleteActivo
  | DeleteActivoFail
  | DeleteActivoSuccess;
