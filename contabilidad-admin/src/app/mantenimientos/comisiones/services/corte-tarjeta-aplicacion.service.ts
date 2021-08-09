import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { CorteDeTarjetaAplicacion } from '../models';
import { Update } from '@ngrx/entity';
import { Periodo } from 'app/_core/models/periodo';

@Injectable({
  providedIn: 'root'
})
export class CorteTarjetaAplicacionService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('tesoreria/cortesTarjetaAplicacion');
  }

  list(periodo: Periodo): Observable<CorteDeTarjetaAplicacion[]> {
    const params = new HttpParams()
      .set('fechaInicial', periodo.fechaInicial.toISOString())
      .set('fechaFinal', periodo.fechaFinal.toISOString());
    return this.http
      .get<CorteDeTarjetaAplicacion[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  update(
    update: Update<CorteDeTarjetaAplicacion>
  ): Observable<CorteDeTarjetaAplicacion> {
    const url = `${this.apiUrl}/${update.id}`;
    return this.http
      .put<CorteDeTarjetaAplicacion>(url, update.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }

  actualizarDeposito(update) {
    const url = this.config.buildApiUrl('tesoreria/updateDeposito');
      const params = new HttpParams()
      .set('fechaDeposito', update.changes.fechaDeposito)
      .set('id', update.id.toString());
     return this.http
    .get<CorteDeTarjetaAplicacion>(url, { params: params })
    .pipe(catchError((error: any) => throwError(error)));
  }

  /*
  actualizarDeposito(update: Update<CorteDeTarjetaAplicacion>, fechaDeposito): Observable<CorteDeTarjetaAplicacion> {
    const params = new HttpParams()
      .set('fechaDeposito', fechaDeposito.toISOString())
      .set('id', update.id.toString());
     return this.http
    .get<CorteDeTarjetaAplicacion>('tesoreria', { params: params })
    .pipe(catchError((error: any) => throwError(error)));
  }
*/
}
