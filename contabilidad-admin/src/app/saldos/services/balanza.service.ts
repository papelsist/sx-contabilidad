import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { SaldoPorCuentaContable } from '../models';
import { EjercicioMes } from '../../models/ejercicio-mes';

@Injectable({ providedIn: 'root' })
export class BalanzaService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(filter: EjercicioMes): Observable<SaldoPorCuentaContable[]> {
    const url = this.config.buildApiUrl('contabilidad/saldos/loadBalanza');
    const params = new HttpParams()
      .set('ejercicio', filter.ejercicio.toString())
      .set('mes', filter.mes.toString());
    return this.http
      .get<SaldoPorCuentaContable[]>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('contabilidad/balanza');
    }
    return this._apiUrl;
  }
}
