import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { ConfigService } from "app/utils/config.service";

import { Empresa } from "../models";
import { Update } from "@ngrx/entity";

@Injectable()
export class EmpresasService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(max = 50, sort = "dateCreated", order = "desc"): Observable<Empresa[]> {
    const params = new HttpParams()
      .set("max", max.toString())
      .set("sort", sort)
      .set("order", order);
    return this.http
      .get<Empresa[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  update(update: Update<Empresa>): Observable<Empresa> {
    const url = `${this.apiUrl}/${update.id}`;
    return this.http
      .put<Empresa>(url, update.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl("sat/empresas");
    }
    return this._apiUrl;
  }
}
