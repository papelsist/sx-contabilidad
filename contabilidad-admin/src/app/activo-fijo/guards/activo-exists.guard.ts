import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { UpsertActivo } from '../store/actions/activo.actions';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { ActivoFijoService } from '../services/activo-fijo.service';
import { LoadDepreciaciones } from '../store';

@Injectable({ providedIn: 'root' })
export class ActivoExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.State>,
    private service: ActivoFijoService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.params.activoId;
    return this.hasEntityInApi(id);
  }

  /**
   * This method loads a poliza contable with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasEntityInApi(id: string): Observable<boolean> {
    return this.service.get(id).pipe(
      map(activo => new UpsertActivo({ activo })),
      tap(action => this.store.dispatch(action)),
      map(activo => !!activo),
      catchError(() => {
        console.error('Could not fetch saldo por cuenta contable', id);
        return of(false);
      })
    );
  }
}
