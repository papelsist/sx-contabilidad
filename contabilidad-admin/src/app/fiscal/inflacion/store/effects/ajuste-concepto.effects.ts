import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from 'app/store';
import * as fromActions from '../actions/ajuste-conceptos.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AjusteConceptoService } from '../../services/ajuste-concepto.service';

@Injectable()
export class AjusteConceptoEffects {
  constructor(
    private actions$: Actions,
    private service: AjusteConceptoService
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadConceptos>(
      fromActions.AjusteConceptoActionTypes.LoadConceptos
    ),
    switchMap(() =>
      this.service.list().pipe(
        map(
          conceptos =>
            new fromActions.LoadConceptosSuccess({
              conceptos
            })
        ),
        catchError(response =>
          of(new fromActions.LoadConceptosFail({ response }))
        )
      )
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<fromActions.LoadConceptosFail>(
      fromActions.AjusteConceptoActionTypes.LoadConceptosFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
