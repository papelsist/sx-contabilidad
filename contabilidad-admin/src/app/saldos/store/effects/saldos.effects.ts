import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import { getSaldosPeriodo } from '../../store/selectors';
import { SALDOS_STORAGE_KEY } from '../reducers/saldos.reducer';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap, take } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from '../actions/saldos.actions';
import { SaldosActionTypes } from '../actions/saldos.actions';

import * as fromServices from '../../services';

import { MatSnackBar } from '@angular/material';

import { saveOnStorage } from '../../../models/ejercicio-mes';

@Injectable()
export class SaldosEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromStore.State>,
    private service: fromServices.SaldosService,
    public snackBar: MatSnackBar
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType(SaldosActionTypes.LoadSaldos),
    switchMap(() => {
      return this.store.pipe(
        select(getSaldosPeriodo),
        take(1)
      );
    }),
    switchMap(filter =>
      this.service.list(filter).pipe(
        map(saldos => new fromActions.LoadSaldosSuccess({ saldos })),
        catchError(error =>
          of(new fromActions.LoadSaldosFail({ response: error }))
        )
      )
    )
  );

  @Effect()
  actualizar$ = this.actions$.pipe(
    ofType(SaldosActionTypes.ActualizarSaldos),
    switchMap(() => {
      return this.store.pipe(
        select(getSaldosPeriodo),
        take(1)
      );
    }),
    switchMap(filter =>
      this.service.actualizar(filter).pipe(
        map(saldos => new fromActions.ActualizarSaldosSuccess({ saldos })),
        catchError(error =>
          of(new fromActions.ActualizarSaldosFail({ response: error }))
        )
      )
    )
  );

  @Effect()
  cierreMensual$ = this.actions$.pipe(
    ofType(SaldosActionTypes.CierreMensual),
    switchMap(() => {
      return this.store.pipe(
        select(getSaldosPeriodo),
        take(1)
      );
    }),
    switchMap(filter =>
      this.service.cierreMensual(filter).pipe(
        map(() => new fromActions.CierreMensualSuccess()),
        catchError(error =>
          of(new fromActions.CierreMensualFail({ response: error }))
        )
      )
    )
  );

  @Effect()
  cierreAnual$ = this.actions$.pipe(
    ofType(SaldosActionTypes.CierreAnual),
    switchMap(() => {
      return this.store.pipe(
        select(getSaldosPeriodo),
        take(1)
      );
    }),
    switchMap(filter =>
      this.service.cierreAnual(filter).pipe(
        map(() => new fromActions.CierreAnualSuccess()),
        catchError(error =>
          of(new fromActions.CierreAnualFail({ response: error }))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  actualizarSuccess$ = this.actions$.pipe(
    ofType<fromActions.ActualizarSaldosSuccess>(
      SaldosActionTypes.ActualizarSaldosSuccess
    ),
    map(action => action.payload.saldos),
    tap(saldos =>
      this.snackBar.open(`Saldos actualizados exitosamente `, 'Cerrar', {
        duration: 8000
      })
    )
  );

  @Effect({ dispatch: false })
  cierreMensualSuccess$ = this.actions$.pipe(
    ofType<fromActions.CierreMensualSuccess>(
      SaldosActionTypes.CierreMensualSuccess
    ),
    tap(() =>
      this.snackBar.open(`Cierre de mes terminado `, 'Cerrar', {
        duration: 8000
      })
    )
  );

  @Effect({ dispatch: false })
  cierreAnuallSuccess$ = this.actions$.pipe(
    ofType<fromActions.CierreAnualSuccess>(
      SaldosActionTypes.CierreAnualSuccess
    ),
    tap(() =>
      this.snackBar.open(`Cierre de ejercicio terminado `, 'Cerrar', {
        duration: 8000
      })
    )
  );

  @Effect()
  setPeriodo$ = this.actions$.pipe(
    ofType<fromActions.SetSaldosPeriodo>(SaldosActionTypes.SetSaldosPeriodo),
    tap(action => {
      saveOnStorage(SALDOS_STORAGE_KEY, action.payload.periodo);
    }),
    map(action => new fromActions.LoadSaldos())
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<
      | fromActions.LoadSaldosFail
      | fromActions.ActualizarSaldosFail
      | fromActions.CierreMensualFail
      | fromActions.CierreAnualFail
    >(
      SaldosActionTypes.LoadSaldosFail,
      SaldosActionTypes.ActualizarSaldosFail,
      SaldosActionTypes.CierreMensualFail,
      SaldosActionTypes.CierreAnualFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
