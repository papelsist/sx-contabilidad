import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions, ofType } from '@ngrx/effects';
import * as RouterActions from '../actions/router.actions';

import { tap, map, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(RouterActions.GO),
    map((action: RouterActions.Go) => action.payload),
    /* HACK POR MISTERIOSO ERROR QUE SURGE APARENTEMENTE DE LOS FILTROS EN
     * ag-grid y posiblemente se detone desde lx-table.component.ts
     */
    filter(({ path }) => {
      const errorPart = path.findIndex(item => item === undefined);
      if (errorPart !== -1) {
        // console.error('Encontro path con error en index: ', errorPart);
        // console.error('Path: ', path);
      }
      return errorPart === -1;
    }),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(RouterActions.BACK),
    tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForwared$ = this.actions$.pipe(
    ofType(RouterActions.FORWARD),
    tap(() => this.location.forward()));
}
