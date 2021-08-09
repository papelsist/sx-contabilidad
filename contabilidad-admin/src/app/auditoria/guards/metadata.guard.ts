import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromActions from '../store/actions/metadata.actions';
import { selectMetadataLoaded, selectMetadataFilter } from '../store/selectors/metadata.selectors';

@Injectable({ providedIn: 'root' })
export class MetadataGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(selectMetadataFilter, selectMetadataLoaded),
      tap( res => console.log(res)),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromActions.LoadMetadata({filter}));
        }
      }),
      filter(loaded => loaded), // Waiting for loaded
      take(1)
    );
  }

  checkStore2(): Observable<boolean> {
    return this.store.pipe(
      select(selectMetadataLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromActions.LoadMetadata({filter}));
        }
      }),
      filter(loaded => loaded), // Waiting for loaded
      take(1)
    );
  }
}
