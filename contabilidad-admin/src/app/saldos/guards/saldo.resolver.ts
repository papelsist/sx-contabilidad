import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';

import { SaldoPorCuentaContable } from '../models';
import { SaldosService } from '../services';

@Injectable({ providedIn: 'root' })
export class SaldoResolver implements Resolve<SaldoPorCuentaContable> {
  constructor(private service: SaldosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SaldoPorCuentaContable> {
    const id = route.paramMap.get('saldoId');
    return this.service.get(id);
  }
}
