import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../reducers/application.reducer';
import * as fromApplication from '../actions/application.actions';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, defer, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel
} from '@angular/router';
import {
  ROUTER_NAVIGATION,
  RouterNavigationAction,
  RouterCancelAction,
  ROUTER_CANCEL
} from '@ngrx/router-store';
import { TdLoadingService, TdDialogService } from '@covalent/core';

@Injectable()
export class ApplicationsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<fromStore.State>,
    private loadingService: TdLoadingService,
    private dialogService: TdDialogService
  ) {
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.store.dispatch(
            new fromApplication.SetGlobalLoading({ loading: true })
          );
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationError:
        case event instanceof NavigationCancel: {
          this.store.dispatch(
            new fromApplication.SetGlobalLoading({ loading: false })
          );
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  @Effect({ dispatch: false })
  loading$ = this.actions$.pipe(
    ofType<fromApplication.SetGlobalLoading>(
      fromApplication.ApplicationActionTypes.SetGlobalLoading
    ),
    tap(action => {
      if (action.payload.loading) {
        this.loadingService.register();
      } else {
        this.loadingService.resolve();
      }
    })
  );

  @Effect({ dispatch: false })
  errorHandler$ = this.actions$.pipe(
    ofType<fromApplication.GlobalHttpError>(
      fromApplication.ApplicationActionTypes.GlobalHttpError
    ),
    tap(action => console.log('Action: ', action)),
    map(action => action.payload.response),
    tap(response => {
      this.loadingService.resolve();
      let message = 'HttpError ';
      if (response) {
        message = response.error ? response.error.message : 'Error';
        const path = response.url;
        if (path) {
          message = `${message} Url: ${path}`;
        }
        console.error('Error: ', response.message);
      } else {
        message = 'HttpError sin mayor informacion';
      }
      this.dialogService.openAlert({
        message: `${response.status} ${message}`,
        title: `Error ${response.status}`,
        closeButton: 'Cerrar'
      });
    })
  );

  @Effect({ dispatch: false })
  init$: Observable<any> = defer(() => of(null)).pipe(
    tap(() => console.log('Effect inicial de la applicacion: init$'))
  );
}
