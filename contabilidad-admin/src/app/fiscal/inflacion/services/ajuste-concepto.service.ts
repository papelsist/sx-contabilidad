import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { Update } from '@ngrx/entity';
import { AjusteConcepto } from '../model';

@Injectable({ providedIn: 'root' })
export class AjusteConceptoService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(): Observable<AjusteConcepto[]> {
    const params = new HttpParams().set('max', '100');
    return this.http
      .get<AjusteConcepto[]>(this.apiUrl, { params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  update(ajuste: Update<AjusteConcepto>): Observable<AjusteConcepto> {
    const url = `${this.apiUrl}/${ajuste.id}`;
    return this.http
      .put<AjusteConcepto>(url, ajuste.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('ajustePorInflacionConcepto');
    }
    return this._apiUrl;
  }
}
