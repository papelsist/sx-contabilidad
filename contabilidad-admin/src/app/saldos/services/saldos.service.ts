import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { SaldoPorCuentaContable } from '../models';
import { Update } from '@ngrx/entity';
import { EjercicioMes } from '../../models/ejercicio-mes';
import { CuentaContable } from 'app/cuentas/models';
import { Periodo } from 'app/_core/models/periodo';
import { PolizaDet } from 'app/polizas/models';

@Injectable({ providedIn: 'root' })
export class SaldosService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(
    filter: EjercicioMes,
    nivel: number = null
  ): Observable<SaldoPorCuentaContable[]> {
    let params = new HttpParams()
      .set('ejercicio', filter.ejercicio.toString())
      .set('mes', filter.mes.toString())
      .set('sort', 'clave')
      .set('order', 'asc');
    if (nivel) {
      params = params.set('nivel', nivel.toString());
    }
    return this.http
      .get<SaldoPorCuentaContable[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<SaldoPorCuentaContable> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<SaldoPorCuentaContable>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  actualizar(periodo: EjercicioMes): Observable<SaldoPorCuentaContable[]> {
    const url = `${this.apiUrl}/actualizar/${periodo.ejercicio}/${periodo.mes}`;
    return this.http
      .put<SaldoPorCuentaContable[]>(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  cierreMensual(periodo: EjercicioMes) {
    const url = `${this.apiUrl}/cierreMensual/${periodo.ejercicio}/${
      periodo.mes
    }`;
    return this.http
      .put(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  cierreAnual(periodo: EjercicioMes) {
    const url = `${this.apiUrl}/cierreAnual/${periodo.ejercicio}`;
    return this.http
      .put(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  loadMovimientos(
    cuenta: Partial<CuentaContable>,
    periodo: Periodo
  ): Observable<PolizaDet[]> {
    const url = `${this.apiUrl}/loadMovimientos`;
    const params = new HttpParams()
      .set('cuenta', cuenta.id.toString())
      .set('fechaInicial', periodo.fechaInicial.toISOString())
      .set('fechaFinal', periodo.fechaFinal.toISOString());
    return this.http
      .get<PolizaDet[]>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  reclasificar(command: { cuenta: number; partidas: any[] }): Observable<any> {
    const url = `${this.apiUrl}/reclasificar`;
    return this.http
      .post<any>(url, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('contabilidad/saldos');
    }
    return this._apiUrl;
  }
}
