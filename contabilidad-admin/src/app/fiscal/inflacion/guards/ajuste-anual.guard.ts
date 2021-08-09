import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromActions from '../store/actions/ajuste-anual.actions';

@Injectable({ providedIn: 'root' })
export class AjusteAnualGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.selectAjustesLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromActions.LoadAjustes({ ejercicio: 2018 }));
        }
      }),
      filter(loaded => loaded), // Waiting for loaded
      take(1)
    );
  }
}
