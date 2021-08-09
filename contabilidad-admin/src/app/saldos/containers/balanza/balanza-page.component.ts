import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SaldoPorCuentaContable } from '../../models';
import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';

import { EjercicioMes } from '../../../models/ejercicio-mes';
import { AuxiliarContableDialogComponent } from 'app/saldos/components';

@Component({
  selector: 'sx-banalza-page',
  templateUrl: './balanza-page.component.html',
  styleUrls: ['./balanza-page.component.scss']
})
export class BalanzaPageComponent implements OnInit, OnDestroy {
  search = '';

  balanza$: Observable<SaldoPorCuentaContable[]>;
  config$: Observable<EjercicioMes>;
  filter: EjercicioMes;

  destroy$ = new Subject<boolean>();
  loading$: Observable<boolean>;

  totales: any;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.config$ = this.store.pipe(select(fromStore.getSaldosPeriodo));
    this.loading$ = this.store.pipe(select(fromStore.selectBalanzaLoading));
    this.balanza$ = this.store.pipe(select(fromStore.selectBalanza));
    this.config$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filter => (this.filter = filter));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  onSelect(event: SaldoPorCuentaContable) {}

  reload(ejercicio: EjercicioMes) {
    this.store.dispatch(new fromStore.LoadBalanza({ periodo: ejercicio }));
  }

  onFilter(event) {
    this.totales = event;
  }

  onActualizar() {}

  printAuxiliar() {
    this.dialog
      .open(AuxiliarContableDialogComponent, {
        data: {
          periodo: this.filter
        },
        width: '750px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(
            `contabilidad/saldos/printAuxiliar`,
            res
          );
        }
      });
  }

  onDrill(saldo: SaldoPorCuentaContable) {
    this.store.dispatch(new fromRoot.Go({ path: ['saldos/mayor', saldo.id] }));
  }

  onSelectionChanged(event: SaldoPorCuentaContable[]) {}
}
