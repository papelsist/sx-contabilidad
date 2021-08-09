import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

@Injectable()
export class MovimientosCostoService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('costos/movimientos');
  }

  list(periodo: { ejercicio: number; mes: number }): Observable<any[]> {
    const url = `${this.apiUrl}/${periodo.ejercicio}/${periodo.mes}`;
    return this.http
      .get<any[]>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
