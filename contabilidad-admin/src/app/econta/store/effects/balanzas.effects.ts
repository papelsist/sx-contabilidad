import { Injectable } from "@angular/core";

import * as fromRoot from "app/store";

import { Effect, Actions, ofType } from "@ngrx/effects";
import {
  map,
  switchMap,
  catchError,
  tap,
  withLatestFrom
} from "rxjs/operators";
import { of } from "rxjs";

import * as fromStore from "../reducers/balanzas.reducer";
import * as fromActions from "../actions/balanzas.actions";
import * as fromSelectors from "../selectors/balanzas.selectors";
import { BalanzasActionTypes } from "../actions/balanzas.actions";

import * as fromServices from "../../services";

import { MatSnackBar } from "@angular/material";
import { Store, select } from "@ngrx/store";

@Injectable()
export class BalanzasEffects {
  constructor(
    private actions$: Actions,
    private service: fromServices.BalanzaService,
    public snackBar: MatSnackBar,
    private store: Store<fromStore.State>
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType(BalanzasActionTypes.LoadBalanzas),
    withLatestFrom(this.store.pipe(select(fromSelectors.getBalanzasEmpresa))),
    switchMap(([action, empresa]) =>
      this.service.list(empresa).pipe(
        map(balanzas => new fromActions.LoadBalanzasSuccess({ balanzas })),
        catchError(error =>
          of(new fromActions.LoadBalanzasFail({ response: error }))
        )
      )
    )
  );

  @Effect()
  generar$ = this.actions$.pipe(
    ofType<fromActions.GenerarBalanza>(BalanzasActionTypes.GenerarBalanza),
    map(action => action.payload),
    switchMap(a =>
      this.service.generar(a.empresa, a.ejercicio, a.mes).pipe(
        map(balanza => new fromActions.GenerarBalanzaSuccess({ balanza })),
        catchError(response =>
          of(new fromActions.GenerarBalanzaFail({ response }))
        )
      )
    )
  );

  @Effect()
  setBalanzasEmpresa$ = this.actions$.pipe(
    ofType<fromActions.SetBalanzasEmpresa>(
      BalanzasActionTypes.SetBalanzasEmpresa
    ),
    tap(action =>
      localStorage.setItem(
        "econta.balanza.empresa",
        JSON.stringify(action.payload.empresa)
      )
    ),
    map(action => new fromActions.LoadBalanzas())
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<fromActions.LoadBalanzasFail | fromActions.GenerarBalanzaFail>(
      BalanzasActionTypes.LoadBalanzasFail,
      BalanzasActionTypes.GenerarBalanzaFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
