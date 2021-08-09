import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { CuentaService } from '../services';

@Injectable()
export class CuentaExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.State>,
    private service: CuentaService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.params.cuentaId;
    return this.hasEntityInApi(id);
  }

  /**
   * This method loads a cuenta contable with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasEntityInApi(id: string): Observable<boolean> {
    return this.service.get(id).pipe(
      map(cuenta => new fromStore.UpsertCuenta({ cuenta })),
      tap(action => this.store.dispatch(action)),
      map(cuenta => !!cuenta),
      catchError(() => {
        console.error('Could not fetch cuenta contable', id);
        return of(false);
      })
    );
  }
}
