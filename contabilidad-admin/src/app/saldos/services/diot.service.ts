import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { EjercicioMes } from '../../models/ejercicio-mes';
import { Diot } from '../models';

@Injectable({ providedIn: 'root' })
export class DiotService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(filter: EjercicioMes): Observable<Diot[]> {
    const params = new HttpParams()
      .set('ejercicio', filter.ejercicio.toString())
      .set('mes', filter.mes.toString());
    return this.http
      .get<Diot[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  generar(filter: EjercicioMes): Observable<Diot[]> {
    const url = `${this.apiUrl}/generar/${filter.ejercicio}/${filter.mes}`;
    return this.http
      .post<Diot[]>(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  downloadDiot(filter: EjercicioMes) {
    this.generarArchivo(filter).subscribe(
      res => {
        const blob = new Blob([res], {
          type: 'text/plain'
        });
        const fileUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = `DIOT_${filter.ejercicio}_${
          filter.mes
        }_${new Date().getTime()}`;
        a.click();
      },
      error => {
        console.log(error);
      }
    );
  }

  generarArchivo(filter: EjercicioMes) {
    const url = `${this.apiUrl}/layout/${filter.ejercicio}/${filter.mes}`;
    const headers = new HttpHeaders().set('Content-type', 'text/plain');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('contabilidad/diot');
    }
    return this._apiUrl;
  }
  /*
  descargarXml(cfdi: any) {
    const endpoint = `cfdis/descargarXml/${cfdi.id}`;
    const url = this.config.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }
  */
}
