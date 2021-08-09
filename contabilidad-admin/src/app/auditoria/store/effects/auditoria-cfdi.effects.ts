import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from 'app/store';
import * as fromActions from '../actions/auditoria-cfdi.actions';
import { AuditoriaCfdiActionTypes } from '../actions/auditoria-cfdi.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { saveOnStorage } from 'app/models/ejercicio-mes';

import { AuditoriaCfdiService } from 'app/auditoria/services/auditoria-cfdi.service';
import { AUDITORIA_CFDI_STORE_KEY } from '../reducers/auditoria-cfdi.reducer';

@Injectable()
export class AuditoriaCfdiEffects {
  constructor(
    private actions$: Actions,
    private service: AuditoriaCfdiService
  ) {}

  @Effect({ dispatch: false })
  setFilter$ = this.actions$.pipe(
    ofType<fromActions.SetAuditoriaCfdiFilter>(
      AuditoriaCfdiActionTypes.SetAuditoriaCfdiFilter
    ),
    map(action => action.payload.filter),
    tap(filter => saveOnStorage(AUDITORIA_CFDI_STORE_KEY, filter))
  );

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadAuditoriaCfdi>(
      AuditoriaCfdiActionTypes.LoadAuditoriaCfdi
    ),
    map(action => action.payload.filter),
    switchMap(filter =>
      this.service.list(filter).pipe(
        map(data => new fromActions.LoadAuditoriaCfdiSuccess({ data })),
        catchError(response =>
          of(new fromActions.LoadAuditoriaCfdiFail({ response }))
        )
      )
    )
  );

  @Effect()
  generar$ = this.actions$.pipe(
    ofType<fromActions.GenerarAuditoriaCfdi>(
      AuditoriaCfdiActionTypes.GenerarAuditoriaCfdi
    ),
    map(action => action.payload.filter),
    switchMap(filter =>
      this.service.generar(filter.ejercicio, filter.mes).pipe(
        map(data => new fromActions.GenerarAuditoriaCfdiSuccess({ data })),
        catchError(response =>
          of(new fromActions.GenerarAuditoriaCfdiFail({ response }))
        )
      )
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<
      fromActions.LoadAuditoriaCfdiFail | fromActions.GenerarAuditoriaCfdiFail
    >(
      AuditoriaCfdiActionTypes.LoadAuditoriaCfdiFail,
      AuditoriaCfdiActionTypes.GenerarAuditoriaCfdiFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
