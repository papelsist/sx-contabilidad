import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store, select } from "@ngrx/store";

import * as fromRoot from "app/store";
import * as fromStore from "../../store";

import { Observable } from "rxjs";

import { Balanza, Empresa } from "../../models";
import { MatDialog } from "@angular/material";
import { EjercicioMesDialogComponent } from "app/_shared/components";
import {
  loadEjercicioMesFromStorage,
  EjercicioMes,
  saveOnStorage,
  buildCurrentPeriodo
} from "app/models/ejercicio-mes";
import { EmpresaSelectorComponent } from "app/econta/components";

@Component({
  selector: "sx-balanzas",
  template: `
    <mat-card >
      <sx-search-title title="Balanzas de comprobación SAT">
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
        <sx-balanzas-table [balanzas]="balanzas$ | async"
          (select)="onSelect($event)"
          ></sx-balanzas-table>
      </ng-template>
      <a mat-fab matTooltip="Nueva balanza" matTooltipPosition="before" color="accent" class="mat-fab-position-bottom-right z-3"
          (click)="onCreate(empresa)"
          *ngIf="empresa$ | async as empresa">
        <mat-icon>add</mat-icon>
      </a>
      <mat-card-footer>

      </mat-card-footer>
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
export class BalanzasComponent implements OnInit {
  search = "";
  balanzas$: Observable<Balanza[]>;
  loading$: Observable<boolean>;
  empresa$: Observable<Empresa>;
  empresa: Empresa;
  periodo: EjercicioMes;

  STORAGE_KEY = "econta.balanza.periodo";

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getBalanzasLoading));
    this.balanzas$ = this.store.pipe(select(fromStore.getBalanzas));
    this.empresa$ = this.store.pipe(select(fromStore.getBalanzasEmpresa));
    this.empresa$.subscribe(val => (this.empresa = val));
    this.periodo = loadEjercicioMesFromStorage(this.STORAGE_KEY);
    const empresaFound = JSON.parse(
      localStorage.getItem("econta.balanza.empresa")
    );
    if (empresaFound) {
      this.store.dispatch(
        new fromStore.SetBalanzasEmpresa({
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
          this.store.dispatch(
            new fromStore.SetBalanzasEmpresa({ empresa: val })
          );
        }
      });
  }

  onSelect(event: Balanza) {
    this.store.dispatch(
      new fromRoot.Go({
        path: ["econta", "balanzas", event.id]
      })
    );
    // this.store.dispatch(new fromStore.MostrarBalanzaXml({ balanza: event }));
  }

  onCreate(empresa: Empresa) {
    this.dialog
      .open(EjercicioMesDialogComponent, {
        data: {
          title: `Generar Balanza  para ${empresa.clave}`,
          periodo: this.periodo
        }
      })
      .afterClosed()
      .subscribe((res: EjercicioMes) => {
        if (res) {
          const { ejercicio, mes } = res;
          saveOnStorage(this.STORAGE_KEY, { ejercicio, mes });
          this.store.dispatch(
            new fromStore.GenerarBalanza({
              empresa,
              ejercicio,
              mes
            })
          );
        }
      });
  }
}
