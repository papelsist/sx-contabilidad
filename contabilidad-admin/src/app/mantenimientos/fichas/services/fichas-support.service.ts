import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { Ficha, FichaFilter } from '../models/ficha';
import { Update } from '@ngrx/entity';

export interface AjusteDeFicha {
  diferencia: number;
  diferenciaUsuario: string;
  diferenciaTipo: 'EN_VALORES' | 'POR_COBRANZA';
}

@Injectable({
  providedIn: 'root'
})
export class FichasSupportService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('tesoreria/fichas');
  }

  list(filter: FichaFilter): Observable<Ficha[]> {
    let params = new HttpParams()
      .set('tipo', filter.tipo)
      .set('fecha', filter.fecha.toISOString());
    if (filter.sucursal) {
      params = params.set('sucursal', filter.sucursal);
    }

    return this.http
      .get<Ficha[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  update(update: Update<Ficha>): Observable<Ficha> {
    const url = `${this.apiUrl}/${update.id}`;
    return this.http
      .put<Ficha>(url, update.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }

  cheques(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/cheques`;
    return this.http.get<any>(url);
  }

  ajustarFicha(id: string, command: AjusteDeFicha): Observable<any> {
    const url = `${this.apiUrl}/ajustarFicha/${id}`;
    return this.http
      .put<any>(this.apiUrl, command)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
