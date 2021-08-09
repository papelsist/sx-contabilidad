import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromActions from '../actions/movimiento.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { SaldosService } from 'app/saldos/services';

@Injectable()
export class MovimientosEffects {
  constructor(private actions$: Actions, private service: SaldosService) {}

  @Effect()
  loadMovimientos$ = this.actions$.pipe(
    ofType<fromActions.LoadMovimientosPorCuenta>(
      fromActions.MovimientoActionTypes.LoadMovimientosPorCuenta
    ),
    map(action => action.payload),
    switchMap(command =>
      this.service.loadMovimientos(command.cuenta, command.periodo).pipe(
        map(
          rows =>
            new fromActions.LoadMovimientosPorCuentaSuccess({
              movimientos: rows
            })
        ),
        catchError(response =>
          of(new fromActions.LoadMovimientosPorCuentaFail({ response }))
        )
      )
    )
  );

  @Effect()
  reclasificar$ = this.actions$.pipe(
    ofType<fromActions.ReclasificarMovimientos>(
      fromActions.MovimientoActionTypes.ReclasificarMovimientos
    ),
    map(action => action.payload),
    switchMap(command =>
      this.service.reclasificar(command).pipe(
        map(rows => new fromActions.ReclasificarMovimientosSuccess()),
        catchError(response =>
          of(new fromActions.ReclasificarMovimientosFail({ response }))
        )
      )
    )
  );
}
