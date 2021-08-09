import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { PolizasPeriodo } from '../models';

@Injectable()
export class PolizasPeriodoService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(
    max = 100,
    sort = 'dateCreated',
    order = 'desc'
  ): Observable<PolizasPeriodo[]> {
    const params = new HttpParams()
      .set('max', max.toString())
      .set('sort', sort)
      .set('order', order);
    return this.http
      .get<PolizasPeriodo[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<PolizasPeriodo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<PolizasPeriodo>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  generar(polizasPeriodo: Partial<PolizasPeriodo>): Observable<PolizasPeriodo> {
    return this.http
      .post<PolizasPeriodo>(this.apiUrl, polizasPeriodo)
      .pipe(catchError((error: any) => throwError(error)));
  }

  delete(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete<PolizasPeriodo>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  mostrarXml(catalogo: Partial<PolizasPeriodo>) {
    const url = `${this.apiUrl}/mostrarXml/${catalogo.id}`;
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    this.http
      .get(url, {
        headers: headers,
        responseType: 'blob'
      })
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'text/xml'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
  }

  descargarXml(catalogo: Partial<PolizasPeriodo>) {
    const url = `${this.apiUrl}/descargarXml/${catalogo.id}`;
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    return this.http
      .get(url, {
        headers: headers,
        responseType: 'blob'
        // observe: 'response'
      })
      .subscribe(response => {
        console.log('Response: ', response);

        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        downloadLink.setAttribute('download', catalogo.fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      });
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('sat/polizas');
    }
    return this._apiUrl;
  }
}
