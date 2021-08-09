import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { ActivoFijo } from '../models/activo-fijo';
import { Update } from '@ngrx/entity';
import { Depreciacion } from '../models/depreciacion';
import { DepreciacionFiscal } from '../models/depreciacion-fiscal';

@Injectable({ providedIn: 'root' })
export class ActivoFijoService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(): Observable<ActivoFijo[]> {
    return this.http
      .get<ActivoFijo[]>(this.apiUrl)
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<ActivoFijo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<ActivoFijo>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  save(activo: Partial<ActivoFijo>): Observable<ActivoFijo> {
    return this.http
      .post<ActivoFijo>(this.apiUrl, activo)
      .pipe(catchError((error: any) => throwError(error)));
  }

  update(activo: Update<ActivoFijo>): Observable<ActivoFijo> {
    const url = `${this.apiUrl}/${activo.id}`;
    return this.http
      .put<ActivoFijo>(url, activo.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }

  delete(activoId: number) {
    const url = `${this.apiUrl}/${activoId}`;
    return this.http.delete(url).pipe()
    .pipe(catchError((error: any) => throwError(error)));
  }

  depreciaciones(activoId: number): Observable<Depreciacion[]> {
    const url = `${this.apiUrl}/${activoId}/depreciaciones`;
    return this.http
      .get<Depreciacion[]>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  createDepreciacion(activoId: number, corte: Date): Observable<Depreciacion> {
    const url = `${this.apiUrl}/${activoId}/depreciaciones`;
    return this.http
      .post<Depreciacion>(url, { corte: corte.toISOString() })
      .pipe(catchError((error: any) => throwError(error)));
  }

  deleteDepreciacion(activoId: number, depreciacionId: number) {
    const url = `${this.apiUrl}/${activoId}/depreciaciones/${depreciacionId}`;
    return this.http
      .delete(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  depreciacionesFiscales(activoId: number): Observable<DepreciacionFiscal[]> {
    const url = `${this.apiUrl}/${activoId}/fiscales`;
    return this.http
      .get<DepreciacionFiscal[]>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  createDepreciacionFiscal(
    activoId: number,
    depreciacion: DepreciacionFiscal
  ): Observable<DepreciacionFiscal> {
    const url = `${this.apiUrl}/${activoId}/fiscales`;
    return this.http
      .post<DepreciacionFiscal>(url, depreciacion)
      .pipe(catchError((error: any) => throwError(error)));
  }

  deleteDepreciacionFiscal(activoId: number, depreciacionId: number) {
    const url = `${this.apiUrl}/${activoId}/fiscales/${depreciacionId}`;
    return this.http
      .delete(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  generarPendientes(): Observable<ActivoFijo[]> {
    const url = `${this.apiUrl}/generarPendientes`;
    return this.http
      .get<ActivoFijo[]>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  generarDepreciacionesBatch(
    ejercicio: number,
    mes: number
  ): Observable<ActivoFijo[]> {
    const url = `${
      this.apiUrl
    }/generarDepreciacionContable/${ejercicio}/${mes}`;
    return this.http
      .get<ActivoFijo[]>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  generarDepreciacionesFiscalBatch(
    ejercicio: number
  ): Observable<ActivoFijo[]> {
    const url = `${this.apiUrl}/generarDepreciacionFiscal/${ejercicio}`;
    return this.http
      .get<ActivoFijo[]>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  asignarInpcMedioMesUso(
    ids: number[],
    inpc: number
  ): Observable<ActivoFijo[]> {
    const url = `${this.apiUrl}/asignarInpcMedioMesUso`;
    return this.http
      .put<ActivoFijo[]>(url, { ids, inpc })
      .pipe(catchError((error: any) => throwError(error)));
  }

  generarResumen(ejercicio: number, mes: number): Observable<any[]> {
    const url = `${this.apiUrl}/resumen/${ejercicio}/${mes}`;
    return this.http
      .get<any[]>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  registrarBaja(activo: Update<ActivoFijo>): Observable<ActivoFijo> {
    const url = `${this.apiUrl}/registrarBaja/${activo.id}`;
    return this.http
      .put<ActivoFijo>(url, activo.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }

  cancelarBaja(activoId: number): Observable<ActivoFijo> {
    const url = `${this.apiUrl}/cancelarBaja/${activoId}`;
    return this.http
      .put<ActivoFijo>(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('activoFijo');
    }
    return this._apiUrl;
  }
}
