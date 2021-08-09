import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from 'app/store';
import * as fromActions from '../actions/ajuste-anual.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { AjusteAnualService } from '../../services/ajuste-anual.service';

@Injectable()
export class AjusteAnualEffects {
  constructor(private actions$: Actions, private service: AjusteAnualService) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadAjustes>(
      fromActions.AjusteAnualActionTypes.LoadAjustes
    ),
    map(action => action.payload),
    switchMap(command =>
      this.service.list(command.ejercicio).pipe(
        map(
          ajus =>
            new fromActions.LoadAjustesSuccess({
              ajus
            })
        ),
        catchError(response =>
          of(new fromActions.LoadAjustesFail({ response }))
        )
      )
    )
  );

  @Effect()
  generar$ = this.actions$.pipe(
    ofType<fromActions.GenerarAjustes>(
      fromActions.AjusteAnualActionTypes.GenerarAjustes
    ),
    map(action => action.payload),
    switchMap(({ejercicio, mes}) =>
      this.service.generar(ejercicio, mes).pipe(
        map(
          ajus =>
            new fromActions.GenerarAjustesSuccess({
              ajus
            })
        ),
        catchError(response =>
          of(new fromActions.GenerarAjustesFail({ response }))
        )
      )
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<fromActions.LoadAjustesFail | fromActions.GenerarAjustesFail>(
      fromActions.AjusteAnualActionTypes.LoadAjustesFail,
      fromActions.AjusteAnualActionTypes.GenerarAjustesFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
