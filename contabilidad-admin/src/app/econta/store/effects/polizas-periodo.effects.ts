import { Injectable } from '@angular/core';

import * as fromRoot from 'app/store';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from '../actions/polizas-periodo.actions';
import { PolizasPeriodoActionTypes } from '../actions/polizas-periodo.actions';

import * as fromServices from '../../services';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class PolizasPeriodoEffects {
  constructor(
    private actions$: Actions,
    private service: fromServices.PolizasPeriodoService,
    public snackBar: MatSnackBar
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType(PolizasPeriodoActionTypes.LoadPolizasPeriodo),
    switchMap(() =>
      this.service.list().pipe(
        map(
          polizasPeriodo =>
            new fromActions.LoadPolizasPeriodoSuccess({ polizasPeriodo })
        ),
        catchError(error =>
          of(new fromActions.LoadPolizasPeriodoFail({ response: error }))
        )
      )
    )
  );

  @Effect()
  generar$ = this.actions$.pipe(
    ofType<fromActions.GenerarPolizasPeriodo>(
      PolizasPeriodoActionTypes.GenerarPolizasPeriodo
    ),
    map(action => action.payload.polizasPeriodo),
    switchMap(command =>
      this.service.generar(command).pipe(
        map(
          polizasPeriodo =>
            new fromActions.GenerarPolizasPeriodoSuccess({ polizasPeriodo })
        ),
        catchError(response =>
          of(new fromActions.GenerarPolizasPeriodoFail({ response }))
        )
      )
    )
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType<fromActions.DeletePolizasPeriodo>(
      PolizasPeriodoActionTypes.DeletePolizasPeriodo
    ),
    map(action => action.payload.polizaPeriodo),
    switchMap(p =>
      this.service.delete(p.id).pipe(
        map(
          () =>
            new fromActions.DeletePolizasPeriodoSuccess({ polizasPeriodo: p })
        ),
        catchError(error =>
          of(new fromActions.DeletePolizasPeriodoFail({ response: error }))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  deleteSucccess$ = this.actions$.pipe(
    ofType<fromActions.DeletePolizasPeriodoSuccess>(
      PolizasPeriodoActionTypes.DeletePolizasPeriodoSuccess
    ),
    tap(action => {
      this.snackBar.open(
        `PolizasDelPeriodo ${action.payload.polizasPeriodo.id} eliminada`,
        'Cerrar',
        {
          duration: 8000
        }
      );
    })
  );

  @Effect({ dispatch: false })
  mostrarXml$ = this.actions$.pipe(
    ofType<fromActions.MostrarPolizasPeriodoXml>(
      PolizasPeriodoActionTypes.MostrarPolizasPeriodoXml
    ),
    map(action => action.payload.polizasPeriodo),
    tap(polizasPeriodo => this.service.mostrarXml(polizasPeriodo))
  );

  @Effect({ dispatch: false })
  descargarXml$ = this.actions$.pipe(
    ofType<fromActions.DescargarPolizasPeriodoXml>(
      PolizasPeriodoActionTypes.DescargarPolizasPeriodoXml
    ),
    map(action => action.payload.polizasPeriodo),
    tap(polizasPeriodo => this.service.descargarXml(polizasPeriodo))
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<
      | fromActions.LoadPolizasPeriodoFail
      | fromActions.GenerarPolizasPeriodoFail
      | fromActions.DeletePolizasPeriodoFail
    >(
      PolizasPeriodoActionTypes.LoadPolizasPeriodoFail,
      PolizasPeriodoActionTypes.GenerarPolizasPeriodoFail,
      PolizasPeriodoActionTypes.DeletePolizasPeriodoFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
