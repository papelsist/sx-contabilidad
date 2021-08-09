import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { ConfigService } from '../../utils/config.service';

import * as _ from 'lodash';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TdLoadingService } from '@covalent/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ReportService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _loadingService: TdLoadingService
  ) {}

  run(url: string, repParams = {}): Observable<any> {
    let params = new HttpParams();
    _.forIn(repParams, (value, key) => {
      params = params.set(key, value);
    });
    const apiUrl = this.config.buildApiUrl(url);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(apiUrl, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }

  runReport(url: string, repParams = {}) {
    this._loadingService.register();
    this.run(url, repParams)
      .pipe(finalize(() => this._loadingService.resolve()))
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileUrl = window.URL.createObjectURL(blob);
          window.open(fileUrl, '_blank');
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          const desc = `${error.message}`;
          const message = `Error:${error.status}, Rep:${url}`;
          this.snackBar.open(message, 'Cerrar', { duration: 10000 });
        }
      );
  }
}
