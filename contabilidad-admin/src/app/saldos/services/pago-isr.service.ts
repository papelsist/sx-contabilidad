import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { PagoIsr } from '../models';
import { EjercicioMes } from '../../models/ejercicio-mes';

@Injectable({ providedIn: 'root' })
export class PagoIsrService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(filter: EjercicioMes): Observable<PagoIsr[]> {
    const params = new HttpParams()
      .set('ejercicio', filter.ejercicio.toString())
      .set('mes', filter.mes.toString())
      .set('sort', 'clave')
      .set('order', 'asc');
    return this.http
      .get<PagoIsr[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  generar(filter: EjercicioMes, data: any): Observable<PagoIsr[]> {
    const url = `${this.apiUrl}/generar/${filter.ejercicio}/${filter.mes}`;
    return this.http
      .post<PagoIsr[]>(url, data)
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('contabilidad/pagoIsr');
    }
    return this._apiUrl;
  }
}
