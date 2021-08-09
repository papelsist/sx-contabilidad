import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromActions from '../store/ficha.actions';
import { getFichasLoaded } from '../store/ficha.selectors';

@Injectable()
export class FichasGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(getFichasLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromActions.LoadFichas());
        }
      }),
      filter(loaded => loaded), // Waiting for loaded
      take(1)
    );
  }
}
