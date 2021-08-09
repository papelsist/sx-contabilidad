import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromMovimientos from '../../store/actions/movimientos-por-producto.actions';

import {
  getMovimientosCostoPeriodo,
  getSelectedProducto
} from '../selectors/movimientos-costo.selectors';

import { of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { MovimientosCostoService } from '../../services';
import { MovimientosCostoActionTypes } from '../actions/movimientos-costo.actions';
import * as fromActions from '../actions/movimientos-costo.actions';

@Injectable()
export class MovimientosCostoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromStore.State>,
    private service: MovimientosCostoService
  ) {}

  @Effect()
  loadMovimientos = this.actions$.pipe(
    ofType<fromActions.LoadMovmientosCosto>(
      MovimientosCostoActionTypes.LoadMovmientosCosto
    ),
    switchMap(() => {
      return this.store.pipe(
        select(getMovimientosCostoPeriodo),
        take(1)
      );
    }),
    switchMap(periodo => {
      return this.service.list(periodo).pipe(
        map(
          res => new fromActions.LoadMovmientosCostoSuccess({ registros: res })
        ),
        catchError(response =>
          of(new fromActions.LoadMovmientosCostoFail({ response }))
        )
      );
    })
  );

  @Effect({ dispatch: false })
  cambiarPeriodo$ = this.actions$.pipe(
    ofType<fromActions.SetPeriodoDeMovmientosCosto>(
      MovimientosCostoActionTypes.SetPeriodoDeMovmientosCosto
    ),
    map(action => action.payload.periodo),
    tap(per =>
      localStorage.setItem('sx.costos.movimientos.periodo', JSON.stringify(per))
    ),
    map(() => new fromActions.LoadMovmientosCosto())
  );

  @Effect()
  selected$ = this.actions$.pipe(
    ofType<fromActions.SelectCurrentProducto>(
      MovimientosCostoActionTypes.SelectCurrentProducto
    ),
    map(action => action.payload.selected),
    withLatestFrom(
      this.store.pipe(select(getMovimientosCostoPeriodo)),
      (producto, periodo) =>
        new fromMovimientos.LoadMovimientos({
          producto,
          periodo
        })
    )
  );

  /**
   * Redirects Http errors to Root Effects handler
   */
  @Effect()
  httpErrors$ = this.actions$.pipe(
    ofType<fromActions.LoadMovmientosCostoFail>(
      MovimientosCostoActionTypes.LoadMovmientosCostoFail
    ),
    map(action => new fromRoot.GlobalHttpError({ response: action.payload }))
  );
}
