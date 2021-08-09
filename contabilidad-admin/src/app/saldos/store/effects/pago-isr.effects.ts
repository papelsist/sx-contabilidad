import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from 'app/store';

import * as fromActions from '../actions/pago-isr.actions';
import { PagoIsrActionTypes } from '../actions/pago-isr.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { PagoIsrService } from 'app/saldos/services/pago-isr.service';

@Injectable()
export class PagoIsrEffects {
  constructor(private actions$: Actions, private service: PagoIsrService) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadPagoIsr>(fromActions.PagoIsrActionTypes.LoadPagoIsr),
    map(action => action.payload.periodo),
    switchMap(per =>
      this.service.list(per).pipe(
        map(
          rows =>
            new fromActions.LoadPagoIsrSuccess({
              rows
            })
        ),
        catchError(response =>
          of(new fromActions.LoadPagoIsrFail({ response }))
        )
      )
    )
  );

  @Effect()
  generar$ = this.actions$.pipe(
    ofType<fromActions.GenerarPagoIsr>(
      fromActions.PagoIsrActionTypes.GenerarPagoIsr
    ),
    // map(action => action.payload.periodo),
    switchMap(a =>
      this.service.generar(a.payload.periodo, a.payload.params).pipe(
        map(
          rows =>
            new fromActions.GenerarPagoIsrSuccess({
              rows
            })
        ),
        catchError(response =>
          of(new fromActions.GenerarPagoIsrFail({ response }))
        )
      )
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<fromActions.LoadPagoIsrFail | fromActions.GenerarPagoIsrFail>(
      PagoIsrActionTypes.LoadPagoIsrFail,
      PagoIsrActionTypes.GenerarPagoIsrFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
