import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { ConfigService } from "app/utils/config.service";

import { Catalogo, Empresa } from "../models";
import { Update } from "@ngrx/entity";

@Injectable()
export class CatalogoService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(
    empresa?: Empresa,
    max = 500,
    sort = "dateCreated",
    order = "desc"
  ): Observable<Catalogo[]> {
    let params = new HttpParams()
      .set("max", max.toString())
      .set("sort", sort)
      .set("order", order);
    if (empresa) {
      params = params.set("empresa", empresa.id);
    }
    return this.http
      .get<Catalogo[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<Catalogo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Catalogo>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  generar(
    empresa: Partial<Empresa>,
    ejercicio: number,
    mes: number
  ): Observable<Catalogo> {
    return this.http
      .post<Catalogo>(this.apiUrl, { empresa: empresa.id, ejercicio, mes })
      .pipe(catchError((error: any) => throwError(error)));
  }

  delete(poliza: Catalogo) {
    const url = `${this.apiUrl}/${poliza.id}`;
    return this.http
      .delete<Catalogo>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  update(update: Update<Catalogo>): Observable<Catalogo> {
    const url = `${this.apiUrl}/${update.id}`;
    return this.http
      .put<Catalogo>(url, update.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }

  recalcular(polizaId: number): Observable<Catalogo> {
    const url = `${this.apiUrl}/recalcular/${polizaId}`;
    return this.http
      .put<Catalogo>(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  mostrarXml(catalogo: Partial<Catalogo>) {
    const url = `${this.apiUrl}/mostrarXml/${catalogo.id}`;
    const headers = new HttpHeaders().set("Content-type", "text/xml");
    this.http
      .get(url, {
        headers: headers,
        responseType: "blob"
      })
      .subscribe(res => {
        const blob = new Blob([res], {
          type: "text/xml"
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, "_blank");
      });
  }

  descargarXml(catalogo: Partial<Catalogo>) {
    const url = `${this.apiUrl}/descargarXml/${catalogo.id}`;
    const headers = new HttpHeaders().set("Content-type", "text/xml");
    return this.http
      .get(url, {
        headers: headers,
        responseType: "blob"
        // observe: 'response'
      })
      .subscribe(response => {
        console.log("Response: ", response);

        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        downloadLink.setAttribute("download", catalogo.fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      });
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl("sat/catalogo");
    }
    return this._apiUrl;
  }
}
