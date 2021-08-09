import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from 'app/store';
import * as fromActions from '../store/actions';
import { InpcActionTypes } from '../store/actions';

import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { InpcService } from '../services/inpc.service';

@Injectable()
export class InpcEffects {
  constructor(private actions$: Actions, private service: InpcService) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadInpcs>(fromActions.InpcActionTypes.LoadInpcs),
    switchMap(() =>
      this.service.list().pipe(
        map(inpcs => new fromActions.LoadInpcsSuccess({ inpcs })),
        catchError(response => of(new fromActions.LoadInpcsFail({ response })))
      )
    )
  );

  @Effect()
  create$ = this.actions$.pipe(
    ofType<fromActions.CreateInpc>(InpcActionTypes.CreateInpc),
    map(action => action.payload.inpc),
    switchMap(a =>
      this.service.save(a).pipe(
        map(inpc => new fromActions.CreateInpcSuccess({ inpc })),
        catchError(response => of(new fromActions.CreateInpcFail({ response })))
      )
    )
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<fromActions.UpdateInpc>(InpcActionTypes.UpdateInpc),
    map(action => action.payload.inpc),
    switchMap(a =>
      this.service.update(a).pipe(
        map(inpc => new fromActions.UpdateInpcSuccess({ inpc })),
        catchError(response => of(new fromActions.UpdateInpcFail({ response })))
      )
    )
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType<fromActions.DeleteInpc>(InpcActionTypes.DeleteInpc),
    map(action => action.payload),
    switchMap(payload =>
      this.service.delete(payload.id).pipe(
        map(
          () =>
            new fromActions.DeleteInpcSuccess({
              id: payload.id
            })
        ),
        catchError(response => of(new fromActions.DeleteInpcFail({ response })))
      )
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<
      | fromActions.LoadInpcsFail
      | fromActions.CreateInpcFail
      | fromActions.UpdateInpcFail
      | fromActions.DeleteInpcFail
    >(
      InpcActionTypes.LoadInpcsFail,
      InpcActionTypes.CreateInpcFail,
      InpcActionTypes.UpdateInpcFail,
      InpcActionTypes.DeleteInpcFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
