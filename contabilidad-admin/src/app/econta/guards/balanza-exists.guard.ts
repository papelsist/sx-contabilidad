import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";

import { Store } from "@ngrx/store";
import * as fromStore from "../store";

import { Observable, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

import { BalanzaService } from "../services";

@Injectable()
export class BalanzaExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.State>,
    private service: BalanzaService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.params.id;
    return this.hasEntityInApi(id);
  }

  /**
   * This method loads a catalogo de cuentas contables with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasEntityInApi(id: string): Observable<boolean> {
    return this.service.get(id).pipe(
      map(balanza => new fromStore.UpsertBalanza({ balanza })),
      tap(action => this.store.dispatch(action)),
      map(poliza => !!poliza),
      catchError(() => {
        console.error("Could not fetch poliza contable", id);
        return of(false);
      })
    );
  }
}
