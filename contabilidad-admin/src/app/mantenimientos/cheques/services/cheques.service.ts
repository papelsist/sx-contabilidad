import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { ChequesFilter, Cheque } from '../models/cheque';



@Injectable()
export class ChequesService {
  private apiUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('tesoreria/cheques');
  }

  list(filter: ChequesFilter): Observable<Cheque[]> {
    let params = new HttpParams()
      .set('registros', filter.registros.toString())
      .set('fechaInicial', filter.fechaInicial.toISOString())
      .set('fechaFinal', filter.fechaFinal.toISOString());
    if (filter.nombre) {
      params = params.set('nombre', filter.nombre);
    }
    return this.http
      .get<Cheque[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<Cheque> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Cheque>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  update(update: {
    id: string | number;
    changes: Partial<Cheque>;
  }): Observable<Cheque> {
    const url = `${this.apiUrl}/${update.id}`;
    return this.http
      .put<Cheque>(url, update.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
