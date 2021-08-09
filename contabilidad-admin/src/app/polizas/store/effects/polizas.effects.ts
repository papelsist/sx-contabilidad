import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from '../actions/poliza.actions';
import { PolizaActionTypes } from '../actions/poliza.actions';

import * as fromServices from '../../services';
import * as fromRoot from 'app/store';
import * as fromContext from '../actions/ui-context.actions';

import { POLIZAS_STORAGE_KEY } from '../reducers/ui-context.reducre';
import { saveOnStorage } from 'app/models/ejercicio-mes';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class PolizasEffects {
  constructor(
    private actions$: Actions,
    private service: fromServices.PolizaService,
    public snackBar: MatSnackBar
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadPolizas>(PolizaActionTypes.LoadPolizas),
    switchMap(action => {
      return this.service.list(action.payload.filter).pipe(
        map(polizas => new fromActions.LoadPolizasSuccess({ polizas })),
        catchError(response =>
          of(new fromActions.LoadPolizasFail({ response }))
        )
      );
    })
  );

  @Effect()
  save$ = this.actions$.pipe(
    ofType<fromActions.CreatePoliza>(PolizaActionTypes.CreatePoliza),
    map(action => action.payload.poliza),
    switchMap(poliza => {
      return this.service.save(poliza).pipe(
        map(res => new fromActions.CreatePolizaSuccess({ poliza: res })),
        catchError(response =>
          of(new fromActions.CreatePolizaFail({ response }))
        )
      );
    })
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<fromActions.UpdatePoliza>(PolizaActionTypes.UpdatePoliza),
    map(action => action.payload.poliza),
    switchMap(poliza => {
      return this.service.update(poliza).pipe(
        map(res => new fromActions.UpdatePolizaSuccess({ poliza: res })),
        catchError(response =>
          of(new fromActions.UpdatePolizaFail({ response }))
        )
      );
    })
  );

  @Effect()
  cerrar$ = this.actions$.pipe(
    ofType<fromActions.CerrarPoliza>(PolizaActionTypes.CerrarPoliza),
    map(action => action.payload.polizaId),
    switchMap(polizaId => {
      return this.service.cerrar(polizaId).pipe(
        map(res => new fromActions.CerrarPolizaSuccess({ poliza: res })),
        catchError(response =>
          of(new fromActions.CerrarPolizaFail({ response }))
        )
      );
    })
  );

  @Effect()
  recalcular$ = this.actions$.pipe(
    ofType<fromActions.RecalcularPoliza>(PolizaActionTypes.RecalcularPoliza),
    map(action => action.payload.polizaId),
    switchMap(polizaId => {
      return this.service.recalcular(polizaId).pipe(
        map(res => new fromActions.RecalcularPolizaSuccess({ poliza: res })),
        catchError(response =>
          of(new fromActions.RecalcularPolizaFail({ response }))
        )
      );
    })
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType<fromActions.DeletePoliza>(PolizaActionTypes.DeletePoliza),
    map(action => action.payload.poliza),
    switchMap(poliza => {
      return this.service.delete(poliza).pipe(
        map(() => new fromActions.DeletePolizaSuccess({ poliza })),
        catchError(response =>
          of(new fromActions.DeletePolizaFail({ response }))
        )
      );
    })
  );

  @Effect()
  createSuccess$ = this.actions$.pipe(
    ofType<fromActions.CreatePolizaSuccess>(
      PolizaActionTypes.CreatePolizaSuccess
    ),
    map(action => action.payload.poliza),
    map(
      poliza =>
        new fromRoot.Go({
          path: [`polizas/${poliza.tipo.toLowerCase()}`, poliza.id],
          query: { tipo: poliza.tipo, subtipo: poliza.subtipo }
        })
    )
  );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$.pipe(
    ofType<
      | fromActions.UpdatePolizaSuccess
      | fromActions.RecalcularPolizaSuccess
      | fromActions.CerrarPolizaSuccess
    >(
      PolizaActionTypes.UpdatePolizaSuccess,
      PolizaActionTypes.RecalcularPolizaSuccess,
      PolizaActionTypes.CerrarPolizaSuccess
    ),
    map(action => action.payload.poliza),
    tap(poliza =>
      this.snackBar.open(`Poliza ${poliza.id} actualizada`, 'Cerrar', {
        duration: 500
      })
    )
    // map(poliza => new fromRoot.Go({ path: ['/polizas', poliza.id] }))
  );

  @Effect()
  deleteSuccess$ = this.actions$.pipe(
    ofType<fromActions.DeletePolizaSuccess>(
      PolizaActionTypes.DeletePolizaSuccess
    ),
    map(action => action.payload.poliza),
    tap(poliza =>
      this.snackBar.open(
        `Poliza ${poliza.tipo} ${poliza.subtipo}: ${poliza.folio} eliminada`,
        'Cerrar',
        {
          duration: 8000
        }
      )
    ),
    map(
      poliza =>
        new fromRoot.Go({
          path: [`polizas/${poliza.tipo.toLowerCase()}`],
          query: { tipo: poliza.tipo, subtipo: poliza.subtipo }
        })
    )
  );

  @Effect({ dispatch: false })
  setFilter$ = this.actions$.pipe(
    ofType<fromContext.SetPeriodoDePoliza>(
      fromContext.UIContextActionTypes.SetPeriodoDePoliza
    ),
    // tap(action => console.log('Periodo de polizas: ', action.payload.periodo)),
    tap(action => {
      saveOnStorage(POLIZAS_STORAGE_KEY, action.payload.periodo);
    })
  );

  @Effect()
  createEgresos$ = this.actions$.pipe(
    ofType<fromActions.CreatePolizasEgreso>(
      PolizaActionTypes.CreatePolizasEgreso
    ),
    map(action => action.payload.filter),
    switchMap(filter => {
      return this.service.generarPolizasEgreso(filter).pipe(
        map(polizas => new fromActions.CreatePolizasEgresoSuccess({ polizas })),
        catchError(response =>
          of(new fromActions.CreatePolizasEgresoFail({ response }))
        )
      );
    })
  );

  @Effect()
  generarPolzias$ = this.actions$.pipe(
    ofType<fromActions.GenerarPolizas>(PolizaActionTypes.GenerarPolizas),
    map(action => action.payload.filter),
    switchMap(filter => {
      return this.service.generarPolizas(filter).pipe(
        map(polizas => new fromActions.GenerarPolizasSuccess({ polizas })),
        catchError(response =>
          of(new fromActions.GenerarPolizasFail({ response }))
        )
      );
    })
  );

  @Effect()
  generarFolios$ = this.actions$.pipe(
    ofType<fromActions.GenerarFolios>(PolizaActionTypes.GenerarFolios),
    map(action => action.payload.filter),
    switchMap(filter => {
      return this.service.generarFolios(filter).pipe(
        map(polizas => new fromActions.GenerarFoliosSuccess({ polizas })),
        catchError(response =>
          of(new fromActions.GenerarFoliosFail({ response }))
        )
      );
    })
  );

  @Effect()
  generarComplementos$ = this.actions$.pipe(
    ofType<fromActions.GenerarComplementos>(
      PolizaActionTypes.GenerarComplementos
    ),
    map(action => action.payload.polizaId),
    switchMap(polizaId => {
      return this.service.generarComplementos(polizaId).pipe(
        map(poliza => new fromActions.UpsertPoliza({ poliza })),
        catchError(response =>
          of(new fromActions.GenerarComplementosFail({ response }))
        )
      );
    })
  );

  @Effect()
  prorratearPartida$ = this.actions$.pipe(
    ofType<fromActions.ProrratearPartida>(PolizaActionTypes.ProrratearPartida),
    map(action => action.payload),
    switchMap(command => {
      return this.service.prorratearPartida(command).pipe(
        map(poliza => new fromActions.UpsertPoliza({ poliza })),
        catchError(response =>
          of(new fromActions.ProrratearPartidaFail({ response }))
        )
      );
    })
  );

  @Effect()
  copiarPoliza$ = this.actions$.pipe(
    ofType<fromActions.CopiarPoliza>(PolizaActionTypes.CopiarPoliza),
    map(action => action.payload.polizaId),
    switchMap(id => {
      return this.service.copiar(id).pipe(
        map(poliza => new fromActions.CopiarPolizaSuccess({ poliza })),
        catchError(response =>
          of(new fromActions.CopiarPolizaFail({ response }))
        )
      );
    })
  );

  @Effect({ dispatch: false })
  copiarPolizaSuccess$ = this.actions$.pipe(
    ofType<fromActions.CopiarPolizaSuccess>(
      PolizaActionTypes.CopiarPolizaSuccess
    ),
    map(action => action.payload.poliza),
    tap(poliza =>
      this.snackBar.open(`Poliza generada ${poliza.folio}`, 'Cerrar', {
        duration: 3000
      })
    )
  );

  @Effect({ dispatch: false })
  generarFoliosSuccess$ = this.actions$.pipe(
    ofType<fromActions.GenerarFoliosSuccess>(
      PolizaActionTypes.GenerarFoliosSuccess
    ),
    map(action => action.payload.polizas),
    tap(polizas =>
      this.snackBar.open(
        `Folios re generados para ${polizas.length} polizas `,
        'Cerrar',
        {
          duration: 8000
        }
      )
    )
    // map(poliza => new fromRoot.Go({ path: ['/polizas', poliza.id] }))
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<
      | fromActions.LoadPolizasFail
      | fromActions.CreatePolizaFail
      | fromActions.UpdatePolizaFail
      | fromActions.RecalcularPolizaFail
      | fromActions.CreatePolizasEgresoFail
      | fromActions.GenerarPolizasFail
      | fromActions.GenerarFoliosFail
      | fromActions.GenerarComplementosFail
      | fromActions.ProrratearPartidaFail
    >(
      PolizaActionTypes.LoadPolizasFail,
      PolizaActionTypes.CreatePolizaFail,
      PolizaActionTypes.UpdatePolizaFail,
      PolizaActionTypes.RecalcularPolizaFail,
      PolizaActionTypes.CreatePolizasEgresoFail,
      PolizaActionTypes.GenerarPolizasFail,
      PolizaActionTypes.GenerarFoliosFail,
      PolizaActionTypes.GenerarComplementosFail,
      PolizaActionTypes.ProrratearPartidaFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
