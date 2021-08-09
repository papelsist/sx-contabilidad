import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from './ficha.reducer';

import { of } from 'rxjs';
import { map, switchMap, tap, catchError, take } from 'rxjs/operators';

import { FichaActionTypes } from './ficha.actions';
import * as fromActions from './ficha.actions';
import { getFichasFilter } from './ficha.selectors';

import { FichasSupportService } from '../services/fichas-support.service';

import { MatSnackBar } from '@angular/material';
import { storeFichaFilter } from '../models/ficha';

@Injectable()
export class FichaEffects {
  constructor(
    private actions$: Actions,
    private service: FichasSupportService,
    private store: Store<fromStore.State>,
    private snackBar: MatSnackBar
  ) {}

  @Effect()
  changeFilter$ = this.actions$.pipe(
    ofType<fromActions.SetFichasFilter>(FichaActionTypes.SetFichasFilter),
    map(action => action.payload.filter),
    tap(filter => storeFichaFilter(filter)),
    map(() => new fromActions.LoadFichas())
  );

  @Effect()
  loadFichas$ = this.actions$.pipe(
    ofType(FichaActionTypes.LoadFichas),
    switchMap(() => {
      return this.store.pipe(
        select(getFichasFilter),
        take(1)
      );
    }),
    switchMap(filter =>
      this.service.list(filter).pipe(
        map(fichas => new fromActions.LoadFichasSuccess({ fichas })),
        catchError(error =>
          of(new fromActions.LoadFichasFail({ response: error }))
        )
      )
    )
  );

  @Effect()
  updateFicha$ = this.actions$.pipe(
    ofType<fromActions.UpdateFicha>(FichaActionTypes.UpdateFicha),
    map(action => action.payload.update),
    switchMap(command => {
      return this.service.update(command).pipe(
        map(res => new fromActions.UpdateFichasSuccess({ ficha: res })),
        catchError(error =>
          of(new fromActions.UpdateFichaFial({ response: error }))
        )
      );
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType<fromActions.UpdateFichasSuccess>(
      FichaActionTypes.UpdateFichaSuccess
    ),
    map(action => action.payload.ficha),
    tap(fichas =>
      this.snackBar.open(
        `Ficha ${fichas.folio} actualizada exitosamente`,
        'Cerrar',
        {
          duration: 7000
        }
      )
    )
  );

  @Effect()
  fail$ = this.actions$.pipe(
    ofType<fromActions.LoadFichasFail | fromActions.UpdateFichaFial>(
      FichaActionTypes.LoadFichasFail,
      FichaActionTypes.UpdateFichaFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
