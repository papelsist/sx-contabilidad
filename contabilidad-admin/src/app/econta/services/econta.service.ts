import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { ConfigService } from "app/utils/config.service";

import { EcontaTipo } from "../models";
import { EcontaDocument } from "../models/econta";

@Injectable()
export class EcontaService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  mostrarXml(tipo: "CATALOGO" | "BALANZA", id: string) {
    const url = `${this.getApiUrl(tipo)}/mostrarXml/${id}`;
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

  descargarXml(tipo: EcontaTipo, id: string, filename: string) {
    const url = `${this.getApiUrl(tipo)}/mostrarXml/${id}`;
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
        downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      });
  }

  mostrarAcuse(tipo: EcontaTipo, id: string) {
    const url = `${this.getApiUrl(tipo)}/mostrarAcuse/${id}`;
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

  descargarAcuse(tipo: EcontaTipo, id: string, filename: string) {
    const url = `${this.getApiUrl(tipo)}/descargarAcuse/${id}`;
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
        downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      });
  }

  uploadAcuse(documento: EcontaDocument, tipo: EcontaTipo, file: File) {
    const url = `${this.getApiUrl(tipo)}/uploadAcuse`;
    const params = new HttpParams()
      .set("documento", documento.id)
      .set("tipo", tipo);
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http
      .post<any>(url, formData, {
        reportProgress: true,
        observe: "events",
        params
      })
      .pipe(catchError((error: any) => throwError(error)));
  }

  getApiUrl(tipo: EcontaTipo) {
    return this.config.buildApiUrl(`sat/${tipo.toLowerCase()}`);
  }
}
