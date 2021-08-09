import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { of } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';

import { InventarioService } from '../../services';
import { MovimientosActionTypes } from '../actions/movimientos-por-producto.actions';
import * as fromActions from '../actions/movimientos-por-producto.actions';
import { MovimientosPorProducto } from '../../models';

@Injectable()
export class MovimientosEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromStore.State>,
    private service: InventarioService
  ) {}

  @Effect()
  loadMovimientos$ = this.actions$.pipe(
    ofType<fromActions.LoadMovimientos>(MovimientosActionTypes.LoadMovimientos),
    map(action => action.payload),
    switchMap(data => {
      return this.service.list(data.producto, data.periodo).pipe(
        map(movimientos => {
          return new fromActions.LoadMovimientosSuccess({ movimientos });
        }),
        catchError(response =>
          of(new fromActions.LoadMovimientosFail({ response }))
        )
      );
    })
  );

  /**
   * Redirects Http errors to Root Effects handler
   */
  @Effect()
  httpErrors$ = this.actions$.pipe(
    ofType<fromActions.LoadMovimientosFail>(
      MovimientosActionTypes.LoadMovimientosFail
    ),
    map(action => new fromRoot.GlobalHttpError({ response: action.payload }))
  );
}
