import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { CostoPromedio } from '../models';

@Injectable()
export class CostoPromedioService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('costos');
  }

  list(periodo: {
    ejercicio: number;
    mes: number;
  }): Observable<CostoPromedio[]> {
    const url = `${this.apiUrl}/${periodo.ejercicio}/${periodo.mes}`;
    return this.http
      .get<CostoPromedio[]>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  generarCalculo(periodo: {
    ejercicio: number;
    mes: number;
  }): Observable<CostoPromedio[]> {
    const url = `${this.apiUrl}/calcular/${periodo.ejercicio}/${periodo.mes}`;
    return this.http
      .post<CostoPromedio[]>(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  costeoMedidasEspeciales(
    periodo: {
      ejercicio: number;
      mes: number;
    },
    productos: string[]
  ) {
    const url = `${this.apiUrl}/costeoMedidasEspeciales`;
    return this.http
      .post(url, { ...periodo, productos })
      .pipe(catchError((error: any) => throwError(error)));
  }

  calcularPorProducto(
    periodo: {
      ejercicio: number;
      mes: number;
    },
    productoId: string
  ) {
    const url = `${this.apiUrl}/calcularPorProducto/${periodo.ejercicio}/${
      periodo.mes
    }`;
    const params = new HttpParams().set('productoId', productoId);
    return this.http
      .put(url, {}, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  aplicarCosto(periodo: {
    ejercicio: number;
    mes: number;
  }): Observable<CostoPromedio[]> {
    const url = `${this.apiUrl}/aplicar/${periodo.ejercicio}/${periodo.mes}`;
    return this.http
      .post<CostoPromedio[]>(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<CostoPromedio> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<CostoPromedio>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
