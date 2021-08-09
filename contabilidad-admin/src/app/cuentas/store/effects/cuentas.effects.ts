import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromCuentas from '../actions/cuentas.actions';
import { CuentaActionTypes } from '../actions/cuentas.actions';

import * as fromServices from '../../services';
import * as fromRoot from 'app/store';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class CuentasEffects {
  constructor(
    private actions$: Actions,
    private service: fromServices.CuentaService,
    public snackBar: MatSnackBar
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromCuentas.LoadCuentas>(CuentaActionTypes.LoadCuentas),
    switchMap(action => {
      return this.service.list(action.payload.filter).pipe(
        map(cuentas => new fromCuentas.LoadCuentasSuccess({ cuentas })),
        catchError(response =>
          of(new fromCuentas.LoadCuentasFail({ response }))
        )
      );
    })
  );

  @Effect()
  save$ = this.actions$.pipe(
    ofType<fromCuentas.CreateCuenta>(CuentaActionTypes.CreateCuenta),
    map(action => action.payload.cuenta),
    switchMap(cuenta => {
      return this.service.save(cuenta).pipe(
        map(res => new fromCuentas.CreateCuentaSuccess({ cuenta: res })),
        catchError(response =>
          of(new fromCuentas.CreateCuentaFail({ response }))
        )
      );
    })
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<fromCuentas.UpdateCuenta>(CuentaActionTypes.UpdateCuenta),
    map(action => action.payload.cuenta),
    switchMap(cuenta => {
      return this.service.update(cuenta).pipe(
        map(res => new fromCuentas.UpdateCuentaSuccess({ cuenta: res })),
        catchError(response =>
          of(new fromCuentas.UpdateCuentaFail({ response }))
        )
      );
    })
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType<fromCuentas.DeleteCuenta>(CuentaActionTypes.DeleteCuenta),
    map(action => action.payload.cuenta),
    switchMap(cuenta => {
      return this.service.delete(cuenta).pipe(
        map(() => new fromCuentas.DeleteCuentaSuccess({ cuenta })),
        catchError(response =>
          of(new fromCuentas.DeleteCuentaFail({ response }))
        )
      );
    })
  );

  @Effect()
  createSuccess$ = this.actions$.pipe(
    ofType<fromCuentas.CreateCuentaSuccess>(
      CuentaActionTypes.CreateCuentaSuccess
    ),
    map(action => action.payload.cuenta),
    map(res => new fromRoot.Go({ path: ['/cuentas', res.id] }))
  );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$.pipe(
    ofType<fromCuentas.UpdateCuentaSuccess>(
      CuentaActionTypes.UpdateCuentaSuccess
    ),
    map(action => action.payload.cuenta),
    tap(res => console.log('Update success from: ', res)),
    tap(cuenta =>
      this.snackBar.open(`Cuenta ${cuenta.clave} actualizada`, 'Cerrar', {
        duration: 8000
      })
    )
    // map(cuenta => new fromRoot.Go({ path: ['/cuentas', cuenta.id] }))
  );

  @Effect()
  deleteSuccess$ = this.actions$.pipe(
    ofType<fromCuentas.DeleteCuentaSuccess>(
      CuentaActionTypes.DeleteCuentaSuccess
    ),
    map(action => action.payload.cuenta),
    tap(cuenta =>
      this.snackBar.open(`Cuenta ${cuenta.clave} eliminada`, 'Cerrar', {
        duration: 8000
      })
    ),
    map(res => new fromRoot.Go({ path: ['/cuentas'] }))
  );

  @Effect()
  setFilter$ = this.actions$.pipe(
    ofType<fromCuentas.SetCatalogoFilter>(CuentaActionTypes.SetCatalogoFilter),
    map(
      action => new fromCuentas.LoadCuentas({ filter: action.payload.filter })
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<
      | fromCuentas.LoadCuentasFail
      | fromCuentas.CreateCuentaFail
      | fromCuentas.UpdateCuentaFail
    >(
      CuentaActionTypes.LoadCuentasFail,
      CuentaActionTypes.CreateCuentaFail,
      CuentaActionTypes.UpdateCuentaFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
