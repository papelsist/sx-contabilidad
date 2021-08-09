import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store, select } from "@ngrx/store";
import * as fromRoot from "app/store";
import * as fromStore from "../../store";

import { Observable } from "rxjs";

import { Catalogo, Empresa } from "../../models";
import { MatDialog } from "@angular/material";
import { EjercicioMesDialogComponent } from "app/_shared/components";
import {
  buildCurrentPeriodo,
  EjercicioMes,
  loadEjercicioMesFromStorage,
  saveOnStorage
} from "app/models/ejercicio-mes";
import { EmpresaSelectorComponent } from "app/econta/components";

@Component({
  selector: "sx-catalogos",
  template: `
    <mat-card >
      <sx-search-title title="Catálogos de cuentas SAT">
        <button class="info" mat-raised-button (click)="chaneEmpresa(empresa)">
          {{(empresa$ | async) ? (empresa$ | async).razonSocial  : 'Seleccione una empresa'}}

        </button>
      </sx-search-title>
      <mat-divider></mat-divider>
      <ng-template
        tdLoading
        [tdLoadingUntil]="!(loading$ | async)"
        tdLoadingStrategy="overlay"
      >
        <sx-catalogos-table [catalogos]="catalogos$ | async"
          (select)="onSelect($event)"
          (download)="onDownload($event)"></sx-catalogos-table>
      </ng-template>
      <a mat-fab matTooltip="Nuevo clatáogo"
          matTooltipPosition="before" color="accent" class="mat-fab-position-bottom-right z-3"
          *ngIf="empresa$ | async as empresa"
          (click)="onCreate(empresa)">
        <mat-icon>add</mat-icon>
      </a>

    </mat-card>

  `,
  styles: [
    `
      .mat-card {
        width: calc(100% - 15px);
        height: calc(100% - 15px);
      }
    `
  ]
})
export class CatalogosComponent implements OnInit {
  search = "";
  catalogos$: Observable<Catalogo[]>;
  loading$: Observable<boolean>;
  empresa$: Observable<Empresa>;
  empresa: Empresa;
  periodo: EjercicioMes;
  STORAGE_KEY = "econta.catalogos.periodo";

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getCatalogosLoading));
    this.catalogos$ = this.store.pipe(select(fromStore.getCatalogos));
    this.empresa$ = this.store.pipe(select(fromStore.getCatalogosEmpresa));
    this.empresa$.subscribe(val => (this.empresa = val));
    this.periodo = loadEjercicioMesFromStorage(this.STORAGE_KEY);
    const empresaFound = JSON.parse(
      localStorage.getItem("econta.catalogos.empresa")
    );
    if (empresaFound) {
      this.store.dispatch(
        new fromStore.SetEmpresa({
          empresa: empresaFound
        })
      );
    }
  }

  chaneEmpresa(selected: Empresa) {
    this.dialog
      .open(EmpresaSelectorComponent, {
        data: { selected }
      })
      .afterClosed()
      .subscribe(val => {
        if (val) {
          this.store.dispatch(new fromStore.SetEmpresa({ empresa: val }));
        }
      });
  }

  onSelect(event: Catalogo) {
    this.store.dispatch(
      new fromRoot.Go({ path: ["econta", "catalogos", event.id] })
    );
    // this.store.dispatch(new fromStore.MostrarCatalogoXml({ catalogo: event }));
  }

  onDownload(event: Catalogo) {
    this.store.dispatch(
      new fromStore.DescargarCatalogoXml({ catalogo: event })
    );
  }

  onCreate(empresa: Empresa) {
    this.dialog
      .open(EjercicioMesDialogComponent, {
        data: {
          title: `Generar catalogo  para ${empresa.clave}`,
          periodo: this.periodo
        }
      })
      .afterClosed()
      .subscribe((res: EjercicioMes) => {
        if (res) {
          const { ejercicio, mes } = res;
          saveOnStorage(this.STORAGE_KEY, { ejercicio, mes });
          this.store.dispatch(
            new fromStore.GenerarCatalogo({
              empresa,
              ejercicio,
              mes
            })
          );
        }
      });
  }
}
