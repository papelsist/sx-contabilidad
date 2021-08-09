import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { CuentaContable, CatalogoFilter } from '../models';
import { Update } from '@ngrx/entity';

@Injectable()
export class CuentaService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    // this.apiUrl = configService.buildApiUrl('cuentaes');
  }

  list(
    filter: CatalogoFilter = { mayor: true, registros: 10 }
  ): Observable<CuentaContable[]> {
    let params = new HttpParams()
      .set('max', filter.registros.toString())
      .set('sort', 'lastUpdated')
      .set('order', 'desc');
    if (filter.mayor) {
      params = params.set('mayor', filter.mayor.toString());
    }
    if (filter.term) {
      params = params.set('term', filter.term);
    }
    return this.http
      .get<CuentaContable[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<CuentaContable> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<CuentaContable>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  save(cuenta: Partial<CuentaContable>): Observable<CuentaContable> {
    return this.http
      .post<CuentaContable>(this.apiUrl, cuenta)
      .pipe(catchError((error: any) => throwError(error)));
  }

  delete(cuenta: CuentaContable) {
    const url = `${this.apiUrl}/${cuenta.id}`;
    return this.http
      .delete<CuentaContable>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  update(update: Update<CuentaContable>): Observable<CuentaContable> {
    const url = `${this.apiUrl}/${update.id}`;
    return this.http
      .put<CuentaContable>(url, update.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('contabilidad/cuentas');
    }
    return this._apiUrl;
  }
}
