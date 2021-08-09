import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";

import { tap, finalize } from "rxjs/operators";

import { Empresa } from "../../models";
import { MatDialog } from "@angular/material";
import { EmpresasService } from "../../services";
import { SqlFormComponent } from "app/econta/components";

@Component({
  selector: "sx-econta-empresas",
  template: `
    <div class="empresas-container">

      <p class="title">
        Catálogo de empresas
      </p>
      <p class="subtitle">
        Empresas registradas para la contabilidad electrónica
      </p>
      <mat-divider></mat-divider>

      <div class="container" >
        <mat-card *ngFor="let empresa of empresas" class="card">
          <mat-card-title>
            {{empresa.clave}}
          </mat-card-title>
          <mat-divider></mat-divider>
          <mat-card-content>
            <mat-list>
              <mat-list-item>
                Razón Social: {{empresa.razonSocial}}
              </mat-list-item>
              <mat-divider></mat-divider>
              <mat-list-item>
                RFC: {{empresa.rfc}}
              </mat-list-item>
              <mat-divider></mat-divider>

              <mat-list-item>
                DataBase URL: {{empresa.dataBaseUrl}}
              </mat-list-item>
              <mat-divider></mat-divider>

              <mat-list-item>
                <mat-label matLine>Catalogos SQL</mat-label>
                <mat-icon matListIcon>code</mat-icon>
                <button mat-icon-button (click)="showSql(empresa, 'sqlCatalogo', 'Catalogos de cuenta')">
                  <mat-icon>edit</mat-icon>
                </button>
              </mat-list-item>
              <mat-divider></mat-divider>

              <mat-list-item>
                <mat-label matLine>Balanza SQL</mat-label>
                <mat-icon matListIcon>code</mat-icon>
                <button mat-icon-button (click)="showSql(empresa, 'sqlBalanza', 'Balanza')">
                  <mat-icon>edit</mat-icon>
                </button>
              </mat-list-item>
              <mat-divider></mat-divider>

              <mat-list-item>
                <mat-label matLine>Auxiliar de folios SQL</mat-label>
                <mat-icon matListIcon>code</mat-icon>
                <button mat-icon-button (click)="showSql(empresa, 'sqlAuxiliarFolios', 'Auxliar de Folios')">
                  <mat-icon>edit</mat-icon>
                </button>
              </mat-list-item>
              <mat-divider></mat-divider>

              <mat-list-item>
                <mat-label matLine>Auxiliar de cuentas SQL</mat-label>
                <mat-icon matListIcon>code</mat-icon>
                <button mat-icon-button (click)="showSql(empresa, 'sqlAuxiliarCuentas', 'Auxliar de Cuentas')">
                  <mat-icon>edit</mat-icon>
                </button>
              </mat-list-item>


            </mat-list>
          </mat-card-content>
        </mat-card>
      </div>
    </div>

  `,
  styleUrls: ["./empresas.component.scss"]
})
export class EmpresasComponent implements OnInit {
  search = "";
  empresas: Empresa[] = [];
  loading = false;

  constructor(
    private service: EmpresasService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service
      .list()
      .pipe(
        tap(() => (this.loading = true)),
        finalize(() => (this.loading = false))
      )
      .subscribe(data => {
        this.empresas = data;
        this.cd.markForCheck();
      });
  }

  showSql(empresa: Empresa, property: string, title: string) {
    const sql = empresa[property];
    this.dialog
      .open(SqlFormComponent, {
        data: { empresa, sql, title },
        width: "750px",
        height: "600px"
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const update = { id: empresa.id, changes: { [property]: res } };
          this.service.update(update).subscribe(updated => this.load());
        }
      });
  }
}
