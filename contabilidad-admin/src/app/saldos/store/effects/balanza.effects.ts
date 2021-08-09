import { Injectable } from '@angular/core';

import * as fromRoot from 'app/store';
import * as fromActions from '../actions/balanza.actions';
import { BalanzaActionTypes } from '../actions/balanza.actions';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { BalanzaService } from '../../services/balanza.service';

@Injectable()
export class BalanzaEffects {
  constructor(private actions$: Actions, private service: BalanzaService) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadBalanza>(BalanzaActionTypes.LoadBalanza),
    map(action => action.payload.periodo),
    switchMap(periodo =>
      this.service.list(periodo).pipe(
        map(saldos => new fromActions.LoadBalanzaSuccess({ saldos })),
        catchError(error =>
          of(new fromActions.LoadBalanzaFail({ response: error }))
        )
      )
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<fromActions.LoadBalanzaFail>(BalanzaActionTypes.LoadBalanzaFail),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
