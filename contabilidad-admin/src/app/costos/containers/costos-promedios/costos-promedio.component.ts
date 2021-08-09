import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/costo-promedio.actions';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CostoPromedio } from '../../models';
import { TdDialogService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { PeriodoCostosDialogComponent } from '../../components';
import { ReportService } from '../../../reportes/services/report.service';

@Component({
  selector: 'sx-costos-promedio',
  template: `
    <mat-card *ngIf="periodo$ | async as periodo">
      <sx-search-title title="Costos promedio " (search)="onSearch($event)">
      <div  class="info">
        <button mat-button (click)="cambiarPeriodo(periodo)">
          Ejercicio: {{periodo.mes}} - {{periodo.ejercicio}}
        </button>
      </div>
      <button class="actions" mat-menu-item (click)="calcularCostoPromedio(periodo)">
        <mat-icon>settings</mat-icon> Generar cálculo
      </button>
      <button class="actions" mat-menu-item (click)="aplicarCostoPromedio(periodo)">
        <mat-icon>swap_vertical_circle</mat-icon> Aplicar costos
      </button>

      </sx-search-title>
      <mat-divider></mat-divider>
      <sx-costos-table [costos]="costos$ | async" [filter]="search$ | async" (select)="onSelect($event)"
      [selectedId]="(selected$ | async)?.id"></sx-costos-table>
    </mat-card>
    <div *ngIf="selected$ | async as selected">
      <sx-analisis-costo [costo]="selected" (close)="closeAnalisis()"></sx-analisis-costo>
    </div>
  `,
  styles: [
    `
      .mat-card {
        width: calc(100% - 15px);
        height: calc(100% - 75px);
      }
    `
  ]
})
export class CostosPromedioComponent implements OnInit {
  costos$: Observable<CostoPromedio[]>;
  selected$: Observable<CostoPromedio>;
  periodo$: Observable<{ ejercicio: number; mes: number }>;
  search$ = new Subject<string>();

  constructor(
    private store: Store<fromStore.State>,
    private dialogService: TdDialogService,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.periodo$ = this.store.pipe(select(fromStore.getCostosPeriodo));
    this.costos$ = this.store.pipe(select(fromStore.getAllCostos));
    this.selected$ = this.store.pipe(select(fromStore.getSelectedCosto));
  }

  onSelect(event: CostoPromedio) {
    this.store.dispatch(
      new fromActions.SetSelectedCosto({ selected: event.id })
    );
  }

  onSearch(event: string) {
    this.search$.next(event);
  }

  cambiarPeriodo(event: { ejercicio: number; mes: number }) {
    this.dialog
      .open(PeriodoCostosDialogComponent, { data: { periodo: event } })
      .afterClosed()
      .subscribe(periodo => {
        if (periodo) {
          this.store.dispatch(new fromActions.SetPeriodoDeCostos({ periodo }));
        }
      });
  }

  calcularCostoPromedio(event: { ejercicio: number; mes: number }) {
    this.confirm(
      `Periodo ${event.mes} -  ${event.ejercicio}`,
      `Generar cálculo de costo promedio?`
    ).subscribe(res => {
      if (res) {
        this.store.dispatch(
          new fromActions.CalculoDeCostoPromedio({ periodo: event })
        );
      }
    });
  }

  aplicarCostoPromedio(event: { ejercicio: number; mes: number }) {
    this.confirm(
      `Periodo ${event.mes} -  ${event.ejercicio}`,
      `Costear el inventario y sus movimientos?`
    ).subscribe(res => {
      if (res) {
        this.store.dispatch(
          new fromActions.AplicarCostoPromedio({ periodo: event })
        );
      }
    });
  }

  confirm(title: string, message: string): Observable<any> {
    return this.dialogService
      .openConfirm({
        title,
        message,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed();
  }

  closeAnalisis() {
    this.store.dispatch(new fromActions.SetSelectedCosto({ selected: null }));
  }
}
