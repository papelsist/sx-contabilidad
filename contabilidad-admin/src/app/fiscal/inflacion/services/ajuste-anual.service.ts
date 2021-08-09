import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Update } from '@ngrx/entity';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { AjusteAnual } from '../model';

@Injectable({ providedIn: 'root' })
export class AjusteAnualService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(ejercicio: number): Observable<AjusteAnual[]> {
    const params = new HttpParams().set('ejercicio', ejercicio.toString());
    return this.http
      .get<AjusteAnual[]>(this.apiUrl, { params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  generar(ejercicio: number, mes: number): Observable<AjusteAnual[]> {
    const url = `${this.apiUrl}/generar/${ejercicio}/${mes}`;
    return this.http
      .post<AjusteAnual[]>(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  recalcular(ejercicio: number): Observable<AjusteAnual[]> {
    const url = `${this.apiUrl}/recalcular/${ejercicio}`;
    return this.http
      .post<AjusteAnual[]>(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  update(inpc: Update<AjusteAnual>): Observable<AjusteAnual> {
    const url = `${this.apiUrl}/${inpc.id}`;
    return this.http
      .put<AjusteAnual>(url, inpc.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }

  sumary(ejercicio: number, mes: number) {
    const url = `${this.apiUrl}/sumary/${ejercicio}/${mes}`;
    return this.http
      .get<any>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('ajusteAnualPorInflacion');
    }
    return this._apiUrl;
  }
}
