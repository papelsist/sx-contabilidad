import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { SatMetadata } from '../models';

import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class MetadataService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(filter: {} = {}): Observable<SatMetadata[]> {
    let params = new HttpParams();
    _.forOwn(filter, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<SatMetadata[]>(this.apiUrl, { params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  importar(ejercicio: number, mes: number): Observable<any> {
    const url = `${this.apiUrl}/importar/${ejercicio}/${mes}`;
    return this.http
      .post<any>(url, { ejercicio, mes })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('sat/metadata');
    }
    return this._apiUrl;
  }
}
