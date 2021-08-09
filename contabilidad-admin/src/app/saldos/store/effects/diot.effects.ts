import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from 'app/store';

import * as fromActions from '../actions/diot.actions';
import { DiotActionTypes } from '../actions/diot.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { DiotService } from 'app/saldos/services/diot.service';

@Injectable()
export class DiotEffects {
  constructor(private actions$: Actions, private service: DiotService) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadDiot>(fromActions.DiotActionTypes.LoadDiot),
    map(action => action.payload.periodo),
    switchMap(per =>
      this.service.list(per).pipe(
        map(
          rows =>
            new fromActions.LoadDiotSuccess({
              rows
            })
        ),
        catchError(response => of(new fromActions.LoadDiotFail({ response })))
      )
    )
  );

  @Effect()
  generar$ = this.actions$.pipe(
    ofType<fromActions.GenerarDiot>(fromActions.DiotActionTypes.GenerarDiot),
    map(action => action.payload.periodo),
    switchMap(per =>
      this.service.generar(per).pipe(
        map(
          rows =>
            new fromActions.GenerarDiotSuccess({
              rows
            })
        ),
        catchError(response =>
          of(new fromActions.GenerarDiotFail({ response }))
        )
      )
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<
      | fromActions.LoadDiotFail
      | fromActions.GenerarDiotFail
      | fromActions.GenerarArchivoDiotFail
    >(
      DiotActionTypes.LoadDiotFail,
      DiotActionTypes.GenerarDiotFail,
      DiotActionTypes.GenerarArchivoDiotFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
