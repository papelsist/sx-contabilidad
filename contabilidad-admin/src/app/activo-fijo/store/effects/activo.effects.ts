import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from 'app/store';
import * as fromActions from '../actions/activo.actions';
import * as fromDepreciaciones from '../actions/depreciacion.actions';
import * as fromFiscal from '../actions/depreciacion-fiscal.actions';
import { ActivoActionTypes } from '../actions/activo.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { ActivoFijoService } from 'app/activo-fijo/services/activo-fijo.service';

@Injectable()
export class ActivoEffects {
  constructor(private actions$: Actions, private service: ActivoFijoService) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadActivos>(fromActions.ActivoActionTypes.LoadActivos),
    switchMap(per =>
      this.service.list().pipe(
        map(activos => new fromActions.LoadActivoSuccess({ activos })),
        catchError(response => of(new fromActions.LoadActivoFail({ response })))
      )
    )
  );

  @Effect()
  create$ = this.actions$.pipe(
    ofType<fromActions.CreateActivo>(ActivoActionTypes.CreateActivo),
    map(action => action.payload.activo),
    switchMap(a =>
      this.service.save(a).pipe(
        map(activo => new fromActions.CreateActivoSuccess({ activo })),
        catchError(response =>
          of(new fromActions.CreateActivoFail({ response }))
        )
      )
    )
  );
  @Effect()
  createSuccess$ = this.actions$.pipe(
    ofType<fromActions.CreateActivoSuccess>(
      ActivoActionTypes.CreateActivoSuccess
    ),
    map(action => action.payload.activo),
    map(activo => new fromRoot.Go({ path: ['operaciones/activos', activo.id] }))
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<fromActions.UpdateActivo>(ActivoActionTypes.UpdateActivo),
    map(action => action.payload.activo),
    switchMap(a =>
      this.service.update(a).pipe(
        map(activo => new fromActions.UpdateActivoSuccess({ activo })),
        catchError(response =>
          of(new fromActions.UpdateActivoFail({ response }))
        )
      )
    )
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType<fromActions.DeleteActivo>(ActivoActionTypes.DeleteActivo),
    map(action => action.payload.activo),
    switchMap(a =>
      this.service.delete(a.id).pipe(
        map(() => new fromActions.DeleteActivoSuccess({ activo: a })),
        catchError(response =>
          of(new fromActions.DeleteActivoFail({ response }))
        )
      )
    )
  );

  @Effect()
  deleteSuccess$ = this.actions$.pipe(
    ofType(ActivoActionTypes.DeleteActivoSuccess),
    map(() => new fromRoot.Go({ path: ['operaciones/activos'] }))
  );

  @Effect()
  loadDepreciaciones$ = this.actions$.pipe(
    ofType<fromDepreciaciones.LoadDepreciaciones>(
      fromDepreciaciones.DepreciacionActionTypes.LoadDepreciaciones
    ),
    map(action => action.payload.actovid),
    switchMap(activoId =>
      this.service.depreciaciones(activoId).pipe(
        map(
          depreciaciones =>
            new fromDepreciaciones.LoadDepreciacionesSuccess({ depreciaciones })
        ),
        catchError(response =>
          of(new fromDepreciaciones.LoadDepreciacionesFail({ response }))
        )
      )
    )
  );

  @Effect()
  createDepreciacion$ = this.actions$.pipe(
    ofType<fromDepreciaciones.CreateDepreciacion>(
      fromDepreciaciones.DepreciacionActionTypes.CreateDepreciacion
    ),
    map(action => action.payload),
    switchMap(payload =>
      this.service.createDepreciacion(payload.activoId, payload.corte).pipe(
        map(
          depreciacion =>
            new fromDepreciaciones.CreateDepreciacionSuccess({ depreciacion })
        ),
        catchError(response =>
          of(new fromDepreciaciones.CreateDepreciacionFail({ response }))
        )
      )
    )
  );

  @Effect()
  deleteDepreciacion$ = this.actions$.pipe(
    ofType<fromDepreciaciones.DeleteDepreciacion>(
      fromDepreciaciones.DepreciacionActionTypes.DeleteDepreciacion
    ),
    map(action => action.payload),
    switchMap(payload =>
      this.service
        .deleteDepreciacion(payload.activoId, payload.deperciacionId)
        .pipe(
          map(
            () =>
              new fromDepreciaciones.DeleteDepreciacionSuccess({
                deperciacionId: payload.deperciacionId
              })
          ),
          catchError(response =>
            of(new fromDepreciaciones.DeleteDepreciacionFail({ response }))
          )
        )
    )
  );

  /// Fiscal

  @Effect()
  loadDepreciacionesFiscales$ = this.actions$.pipe(
    ofType<fromFiscal.LoadDepreciacionesFiscales>(
      fromFiscal.DepreciacionFiscalActionTypes.LoadDepreciacionesFiscales
    ),
    map(action => action.payload.actovid),
    switchMap(activoId =>
      this.service.depreciacionesFiscales(activoId).pipe(
        map(
          depreciaciones =>
            new fromFiscal.LoadDepreciacionesFiscalesSuccess({ depreciaciones })
        ),
        catchError(response =>
          of(new fromFiscal.LoadDepreciacionesFiscalesFail({ response }))
        )
      )
    )
  );

  @Effect()
  createDepreciacionFiscal$ = this.actions$.pipe(
    ofType<fromFiscal.CreateDepreciacionFiscal>(
      fromFiscal.DepreciacionFiscalActionTypes.CreateDepreciacionFiscal
    ),
    map(action => action.payload),
    switchMap(payload =>
      this.service
        .createDepreciacionFiscal(payload.activoId, payload.depreciacion)
        .pipe(
          map(
            depreciacion =>
              new fromFiscal.CreateDepreciacionFiscalSuccess({ depreciacion })
          ),
          catchError(response =>
            of(new fromFiscal.CreateDepreciacionFiscalFail({ response }))
          )
        )
    )
  );

  @Effect()
  deleteDepreciacionFiscal$ = this.actions$.pipe(
    ofType<fromFiscal.DeleteDepreciacionFiscal>(
      fromFiscal.DepreciacionFiscalActionTypes.DeleteDepreciacionFiscal
    ),
    map(action => action.payload),
    switchMap(payload =>
      this.service
        .deleteDepreciacionFiscal(payload.activoId, payload.deperciacionId)
        .pipe(
          map(
            () =>
              new fromFiscal.DeleteDepreciacionFiscalSuccess({
                deperciacionId: payload.deperciacionId
              })
          ),
          catchError(response =>
            of(new fromFiscal.DeleteDepreciacionFiscalFail({ response }))
          )
        )
    )
  );

  @Effect()
  generarPendientes$ = this.actions$.pipe(
    ofType<fromActions.GenerarPendientes>(ActivoActionTypes.GenerarPendientes),
    switchMap(payload =>
      this.service.generarPendientes().pipe(
        map(activos => new fromActions.GenerarPendientesSuccess({ activos })),
        catchError(response =>
          of(new fromActions.GenerarPendientesFail({ response }))
        )
      )
    )
  );

  @Effect()
  generarDepreciacionesBatch$ = this.actions$.pipe(
    ofType<fromActions.GenerarDepreciacionBatch>(
      ActivoActionTypes.GenerarDepreciacionBatch
    ),
    map(action => action.payload.periodo),
    switchMap(p =>
      this.service.generarDepreciacionesBatch(p.ejercicio, p.mes).pipe(
        map(
          activos =>
            new fromActions.GenerarDepreciacionBatchSuccess({ activos })
        ),
        catchError(response =>
          of(new fromActions.GenerarDepreciacionBatchFail({ response }))
        )
      )
    )
  );

  @Effect()
  generarDepreciacionesFiscalBatch$ = this.actions$.pipe(
    ofType<fromActions.GenerarDepreciacionFiscalBatch>(
      ActivoActionTypes.GenerarDepreciacionFiscalBatch
    ),
    map(action => action.payload.ejercicio),
    switchMap(ejercicio =>
      this.service.generarDepreciacionesFiscalBatch(ejercicio).pipe(
        map(
          activos =>
            new fromActions.GenerarDepreciacionFiscalBatchSuccess({ activos })
        ),
        catchError(response =>
          of(new fromActions.GenerarDepreciacionFiscalBatchFail({ response }))
        )
      )
    )
  );

  @Effect()
  asignarInpc$ = this.actions$.pipe(
    ofType<fromActions.AsignarInpc>(ActivoActionTypes.AsignarInpc),
    map(action => action.payload),
    switchMap(p =>
      this.service.asignarInpcMedioMesUso(p.ids, p.inpc).pipe(
        map(activos => new fromActions.AsignarInpcSuccess({ activos })),
        catchError(response =>
          of(new fromActions.AsignarInpcFail({ response }))
        )
      )
    )
  );

  @Effect()
  registrarBaja$ = this.actions$.pipe(
    ofType<fromActions.RegistrarBaja>(ActivoActionTypes.RegistrarBaja),
    map(action => action.payload),
    switchMap(p =>
      this.service.registrarBaja(p.activo).pipe(
        map(activo => new fromActions.RegistrarBajaSuccess({ activo })),
        catchError(response =>
          of(new fromActions.RegistrarBajaFail({ response }))
        )
      )
    )
  );

  @Effect()
  cancelarBaja$ = this.actions$.pipe(
    ofType<fromActions.CancelarBaja>(ActivoActionTypes.CancelarBaja),
    map(action => action.payload),
    switchMap(p =>
      this.service.cancelarBaja(p.activoId).pipe(
        map(activo => new fromActions.CancelarBajaSuccess({ activo })),
        catchError(response =>
          of(new fromActions.CancelarBajaFail({ response }))
        )
      )
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<
      | fromActions.LoadActivoFail
      | fromActions.CreateActivoFail
      | fromActions.UpdateActivoFail
      | fromDepreciaciones.CreateDepreciacionFail
      | fromDepreciaciones.DeleteDepreciacionFail
      | fromFiscal.LoadDepreciacionesFiscalesFail
      | fromFiscal.CreateDepreciacionFiscalFail
      | fromFiscal.DeleteDepreciacionFiscalFail
      | fromActions.GenerarPendientesFail
      | fromActions.GenerarDepreciacionBatchFail
      | fromActions.GenerarDepreciacionFiscalBatchFail
      | fromActions.AsignarInpcFail
      | fromActions.CancelarBajaFail
      | fromActions.DeleteActivoFail
    >(
      ActivoActionTypes.LoadActivosFail,
      ActivoActionTypes.CreateActivoFail,
      ActivoActionTypes.UpdateActivoFail,
      fromDepreciaciones.DepreciacionActionTypes.CreateDepreciacionFail,
      fromDepreciaciones.DepreciacionActionTypes.DeleteDepreciacionFail,
      fromFiscal.DepreciacionFiscalActionTypes.LoadDepreciacionesFiscalesFail,
      fromFiscal.DepreciacionFiscalActionTypes.CreateDepreciacionFiscalFail,
      fromFiscal.DepreciacionFiscalActionTypes.DeleteDepreciacionFiscalFail,
      ActivoActionTypes.GenerarPendientesFail,
      ActivoActionTypes.GenerarDepreciacionBatchFail,
      ActivoActionTypes.GenerarDepreciacionFiscalBatchFail,
      ActivoActionTypes.AsignarInpcFail,
      ActivoActionTypes.CancelarBajaFail,
      ActivoActionTypes.DeleteActivoFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
