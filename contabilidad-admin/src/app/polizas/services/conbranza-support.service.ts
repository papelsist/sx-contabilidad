import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

export interface AjusteDeCobro {
  formaDePago: 'EFECTIVO' | 'PAGO_DIF';
}

@Injectable({
  providedIn: 'root'
})
export class CobranzaSupportService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('cxc/cobro');
  }

  ajustarFormaDePago(id: string, formaDePago: string): Observable<any> {
    const url = `${this.apiUrl}/ajustarFormaDePago/${id}`;
    const params = new HttpParams().set('formaDePago', formaDePago);
    return this.http
      .put<any>(url, {}, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
