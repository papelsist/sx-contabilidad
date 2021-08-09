import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { Inventario } from '../../models/inventario';

@Injectable()
export class InventarioService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('inventario');
  }

  list(
    producto: string,
    periodo: { ejercicio: number; mes: number }
  ): Observable<Inventario[]> {
    const url = `${this.apiUrl}/${producto}/${periodo.ejercicio}/${
      periodo.mes
    }`;
    return this.http
      .get<any[]>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
