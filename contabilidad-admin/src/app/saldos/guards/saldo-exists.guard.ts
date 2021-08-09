import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { UpsertSaldo } from '../store/actions/saldos.actions';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { SaldosService } from '../services';

@Injectable({ providedIn: 'root' })
export class SaldoExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.State>,
    private service: SaldosService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.params.saldoId;
    return this.hasEntityInApi(id);
  }

  /**
   * This method loads a poliza contable with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasEntityInApi(id: string): Observable<boolean> {
    return this.service.get(id).pipe(
      map(saldo => new UpsertSaldo({ saldo })),
      tap(action => this.store.dispatch(action)),
      map(saldo => !!saldo),
      catchError(() => {
        console.error('Could not fetch saldo por cuenta contable', id);
        return of(false);
      })
    );
    return of(true);
  }
}
