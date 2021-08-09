import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import { getCostosPeriodo } from '../selectors/costo-promedio.selectors';

import { of } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';

import { CostoPromedioService } from '../../services';
import { CostoActionTypes } from '../actions';
import * as fromActions from '../actions/costo-promedio.actions';

@Injectable()
export class CostoPromedioEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromStore.State>,
    private service: CostoPromedioService
  ) {}

  @Effect()
  loadCostos = this.actions$.pipe(
    ofType<fromActions.LoadCostos>(CostoActionTypes.LoadCostos),
    switchMap(() => {
      return this.store.pipe(
        select(getCostosPeriodo),
        take(1)
      );
    }),
    switchMap(periodo => {
      return this.service.list(periodo).pipe(
        map(res => new fromActions.LoadCostosSuccess({ costos: res })),
        catchError(response => of(new fromActions.LoadCostosFail({ response })))
      );
    })
  );

  @Effect()
  calcularCosto$ = this.actions$.pipe(
    ofType<fromActions.CalculoDeCostoPromedio>(
      CostoActionTypes.CalculoDeCostoPromedio
    ),
    map(action => action.payload.periodo),
    switchMap(periodo => {
      return this.service.generarCalculo(periodo).pipe(
        map(
          res => new fromActions.CalculoDeCostoPromedioSuccess({ costos: res })
        ),
        catchError(response =>
          of(new fromActions.CalculoDeCostoPromedioFail({ response }))
        )
      );
    })
  );

  @Effect()
  aplicarCosto$ = this.actions$.pipe(
    ofType<fromActions.AplicarCostoPromedio>(
      CostoActionTypes.AplicarCostoPromedio
    ),
    map(action => action.payload.periodo),
    switchMap(periodo => {
      return this.service.aplicarCosto(periodo).pipe(
        map(res => new fromActions.AplicarCostoPromedioSuccess()),
        catchError(response =>
          of(new fromActions.AplicarCostoPromedioFail({ response }))
        )
      );
    })
  );

  @Effect()
  cambiarPeriodo$ = this.actions$.pipe(
    ofType<fromActions.SetPeriodoDeCostos>(CostoActionTypes.SetPeriodoDeCostos),
    map(() => new fromActions.LoadCostos())
  );

  /**
   * Redirects Http errors to Root Effects handler
   */
  @Effect()
  httpErrors$ = this.actions$.pipe(
    ofType<fromActions.LoadCostosFail | fromActions.CalculoDeCostoPromedioFail>(
      CostoActionTypes.LoadCostosFail,
      CostoActionTypes.CalculoDeCostoPromedioFail
    ),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
