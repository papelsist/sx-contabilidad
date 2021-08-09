import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { AuditoriaFiscalCfdi } from '../models';

import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class AuditoriaCfdiService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(filter: any): Observable<AuditoriaFiscalCfdi[]> {
    let params = new HttpParams();
    _.forOwn(filter, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<AuditoriaFiscalCfdi[]>(this.apiUrl, {params})
      .pipe(catchError((error: any) => throwError(error)));
  }

  generar(ejercicio: number, mes: number): Observable<AuditoriaFiscalCfdi[]> {
    const url = `${this.apiUrl}/generar/${ejercicio}/${mes}`;
    return this.http
      .post<AuditoriaFiscalCfdi[]>(url, { ejercicio, mes })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('auditoria/cfdi');
    }
    return this._apiUrl;
  }
}
