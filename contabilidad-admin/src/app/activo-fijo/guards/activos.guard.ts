import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromActions from '../store/actions/activo.actions';
import { selectActivosLoaded } from '../store/selectors/activos.selectors';

@Injectable({ providedIn: 'root' })
export class ActivosGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(selectActivosLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromActions.LoadActivos());
        }
      }),
      filter(loaded => loaded), // Waiting for loaded
      take(1)
    );
  }
}
