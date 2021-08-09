import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from 'app/store';
import * as fromActions from '../actions/metadata.actions';
import { MetadataActionTypes } from '../actions/metadata.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { MetadataService } from 'app/auditoria/services/metadata.service';
import { saveOnStorage } from 'app/models/ejercicio-mes';
import { METADATA_STORE_KEY } from '../reducers/metadata.reducer';
import { TdDialogService } from '@covalent/core';

@Injectable()
export class MetadataEffects {
  constructor(
    private actions$: Actions,
    private service: MetadataService,
    private dialogService: TdDialogService
  ) {}

  @Effect({ dispatch: false })
  setFilter$ = this.actions$.pipe(
    ofType<fromActions.SetMetadataFilter>(
      MetadataActionTypes.SetMetadataFilter
    ),
    map(action => action.payload.filter),
    tap(filter => saveOnStorage(METADATA_STORE_KEY, filter))
  );

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadMetadata>(MetadataActionTypes.LoadMetadata),
    map(action => action.payload.filter),
    switchMap(filter =>
      this.service.list(filter).pipe(
        map(data => new fromActions.LoadMetadataSuccess({ data })),
        catchError(response =>
          of(new fromActions.LoadMetadataFail({ response }))
        )
      )
    )
  );

  @Effect()
  importar$ = this.actions$.pipe(
    ofType<fromActions.ImportarMetadata>(MetadataActionTypes.ImportarMetadata),
    map(action => action.payload.filter),
    switchMap(filter =>
      this.service.importar(filter.ejercicio, filter.mes).pipe(
        map(() => new fromActions.ImportarMetadataSuccess()),
        catchError(response =>
          of(new fromActions.LoadMetadataFail({ response }))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  importarSuccess$ = this.actions$.pipe(
    ofType<fromActions.ImportarMetadataSuccess>(MetadataActionTypes.ImportarMetadataSuccess),
    tap(() => {
      this.dialogService
        .openAlert({
          title: 'IMPORTACION DE METADATA EXITOSA',
          message: 'NO OLVIDE RECARGAR EL TABLERO',
          closeButton: 'CERRAR'
        })
        .afterClosed();
    })
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<fromActions.LoadMetadataFail | fromActions.ImportarMetadataFail>(
      MetadataActionTypes.LoadMetadataFail,
      MetadataActionTypes.ImportarMetadataFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
