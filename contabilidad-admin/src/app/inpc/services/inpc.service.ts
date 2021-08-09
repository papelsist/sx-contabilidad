import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { Update } from '@ngrx/entity';
import { Inpc } from '../models/inpc';

@Injectable({ providedIn: 'root' })
export class InpcService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(): Observable<Inpc[]> {
    const params = new HttpParams()
    .set('max', '5000')
    .set('sort', 'ejercicio')
    .set('order', 'desc');
    return this.http
      .get<Inpc[]>(this.apiUrl, { params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: number): Observable<Inpc> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Inpc>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  save(inpc: Partial<Inpc>): Observable<Inpc> {
    return this.http
      .post<Inpc>(this.apiUrl, inpc)
      .pipe(catchError((error: any) => throwError(error)));
  }

  update(inpc: Update<Inpc>): Observable<Inpc> {
    const url = `${this.apiUrl}/${inpc.id}`;
    return this.http
      .put<Inpc>(url, inpc.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }

  delete(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('inpc');
    }
    return this._apiUrl;
  }
}
