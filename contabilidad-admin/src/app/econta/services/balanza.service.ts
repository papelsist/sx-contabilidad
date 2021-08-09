import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { ConfigService } from "app/utils/config.service";

import { Balanza, Empresa } from "../models";

@Injectable()
export class BalanzaService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(empresa?: Empresa): Observable<Balanza[]> {
    let params = new HttpParams()
      .set("max", "500")
      .set("sort", "dateCreated")
      .set("order", "desc");
    if (empresa) {
      params = params.set("empresa", empresa.id);
    }
    return this.http
      .get<Balanza[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<Balanza> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Balanza>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  generar(
    empresa: Empresa,
    ejercicio: number,
    mes: number
  ): Observable<Balanza> {
    return this.http
      .post<Balanza>(this.apiUrl, { empresa: empresa.id, ejercicio, mes })
      .pipe(catchError((error: any) => throwError(error)));
  }

  delete(poliza: Balanza) {
    const url = `${this.apiUrl}/${poliza.id}`;
    return this.http
      .delete<Balanza>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl("sat/balanza");
    }
    return this._apiUrl;
  }
}
