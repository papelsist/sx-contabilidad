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

import * as fromStore from "../reducers/catalogos.reducer";
import * as fromActions from "../actions/catalogos.actions";
import * as fromSelectors from "../selectors/catalogos.selectors";
import { CatalogosActionTypes } from "../actions/catalogos.actions";

import * as fromServices from "../../services";

import { MatSnackBar } from "@angular/material";
import { select, Store } from "@ngrx/store";

@Injectable()
export class CatalogosEffects {
  constructor(
    private actions$: Actions,
    private service: fromServices.CatalogoService,
    public snackBar: MatSnackBar,
    private store: Store<fromStore.State>
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType(CatalogosActionTypes.LoadCatalogos),
    withLatestFrom(this.store.pipe(select(fromSelectors.getCatalogosEmpresa))),
    switchMap(([action, empresa]) => {
      return this.service.list(empresa).pipe(
        map(catalogos => new fromActions.LoadCatalogosSuccess({ catalogos })),
        catchError(error =>
          of(new fromActions.LoadCatalogosFail({ response: error }))
        )
      );
    })
  );

  @Effect()
  generar$ = this.actions$.pipe(
    ofType<fromActions.GenerarCatalogo>(CatalogosActionTypes.GenerarCatalogo),
    map(action => action.payload),
    switchMap(cmd =>
      this.service.generar(cmd.empresa, cmd.ejercicio, cmd.mes).pipe(
        map(catalogo => new fromActions.GenerarCatalogoSuccess({ catalogo })),
        catchError(response =>
          of(new fromActions.GenerarCatalogoFail({ response }))
        )
      )
    )
  );

  @Effect()
  setEmpresa$ = this.actions$.pipe(
    ofType<fromActions.SetEmpresa>(CatalogosActionTypes.SetEmpresa),
    tap(action =>
      localStorage.setItem(
        "econta.catalogos.empresa",
        JSON.stringify(action.payload.empresa)
      )
    ),
    map(action => new fromActions.LoadCatalogos())
  );

  @Effect({ dispatch: false })
  mostrarXml$ = this.actions$.pipe(
    ofType<fromActions.MostrarCatalogoXml>(
      CatalogosActionTypes.MostrarCatalogoXml
    ),
    map(action => action.payload.catalogo),
    tap(catalogo => this.service.mostrarXml(catalogo))
  );

  @Effect({ dispatch: false })
  descargarXml$ = this.actions$.pipe(
    ofType<fromActions.DescargarCatalogoXml>(
      CatalogosActionTypes.DescargarCatalogoXml
    ),
    map(action => action.payload.catalogo),
    tap(catalogo => this.service.descargarXml(catalogo))
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<fromActions.LoadCatalogosFail>(
      CatalogosActionTypes.LoadCatalogosFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
