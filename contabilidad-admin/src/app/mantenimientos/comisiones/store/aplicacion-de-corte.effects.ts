import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromRoot from 'app/store';

import { of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

import { AplicacionDeCorteActionTypes } from './aplicacion-de-corte.actions';
import * as fromActions from './aplicacion-de-corte.actions';

import { CorteTarjetaAplicacionService } from '../services/corte-tarjeta-aplicacion.service';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class AplicacionDeCorteEffects {
  constructor(
    private actions$: Actions,
    private service: CorteTarjetaAplicacionService,
    private snackBar: MatSnackBar
  ) {}

  @Effect()
  loadComisiones$ = this.actions$.pipe(
    ofType<fromActions.LoadAplicacionesDeCorte>(
      AplicacionDeCorteActionTypes.LoadAplicacionesDeCorte
    ),
    map(action => action.payload.periodo),
    switchMap(periodo =>
      this.service.list(periodo).pipe(
        map(
          aplicaciones =>
            new fromActions.LoadAplicacionesDeCorteSuccess({ aplicaciones })
        ),
        catchError(error =>
          of(new fromActions.LoadAplicacionesDeCorteFail({ response: error }))
        )
      )
    )
  );

  @Effect()
  updateFicha$ = this.actions$.pipe(
    ofType<fromActions.UpdateAplicacionDeCorte>(
      AplicacionDeCorteActionTypes.UpdateAplicacionDeCorte
    ),
    map(action => action.payload.update),
    switchMap(command => {
      return this.service.update(command).pipe(
        map(
          aplicacion =>
            new fromActions.UpdateAplicacionDeCorteSuccess({ aplicacion })
        ),
        catchError(error =>
          of(new fromActions.UpdateAplicacionDeCorteFial({ response: error }))
        )
      );
    })
  );


  @Effect()
  updateFechaCorte$ = this.actions$.pipe(
    ofType<fromActions.UpdateFechaCorte>(
      AplicacionDeCorteActionTypes.UpdateFechaCorte
    ),
    map(action => action.payload.update),
    switchMap(command => {
      return this.service.actualizarDeposito(command).pipe(
        map(
          aplicacion =>
            new fromActions.UpdateAplicacionDeCorteSuccess({ aplicacion })
        ),
        catchError(error =>
          of(new fromActions.UpdateAplicacionDeCorteFial({ response: error }))
        )
      );
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType<fromActions.UpdateAplicacionDeCorteSuccess>(
      AplicacionDeCorteActionTypes.UpdateAplicacionDeCorteSuccess
    ),
    map(action => action.payload.aplicacion),
    tap(aplicacion =>
      this.snackBar.open(
        `Apliación ${aplicacion.id} de corte actualizada`,
        'Cerrar',
        {
          duration: 7000
        }
      )
    )
  );

  @Effect()
  fail$ = this.actions$.pipe(
    ofType<
      | fromActions.LoadAplicacionesDeCorteFail
      | fromActions.UpdateAplicacionDeCorteFial
    >(
      AplicacionDeCorteActionTypes.LoadAplicacionesDeCorteFail,
      AplicacionDeCorteActionTypes.UpdateAplicacionDeCorteFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
