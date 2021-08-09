import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PagoIsr } from '../../models';
import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { EjercicioMes } from '../../../models/ejercicio-mes';
import { PagoIsrModalComponent } from '../../components';

@Component({
  selector: 'sx-pago-isr',
  templateUrl: './pago-isr.component.html',
  styleUrls: ['./pago-isr.component.scss']
})
export class PagoIsrComponent implements OnInit, OnDestroy {
  search = '';
  rows$: Observable<PagoIsr[]>;

  periodo: EjercicioMes;

  destroy$ = new Subject<boolean>();
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getPagoIsrLoading));
    this.rows$ = this.store.pipe(select(fromStore.getAllPagoIsr));

    this.store
      .pipe(select(fromStore.getSaldosPeriodo))
      .pipe(takeUntil(this.destroy$))
      .subscribe(p => {
        this.periodo = p;
        this.reload(this.periodo);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSelect(event: PagoIsr) {}

  reload(periodo: EjercicioMes) {
    this.store.dispatch(new fromStore.LoadPagoIsr({ periodo }));
  }

  onFilter(event) {}

  onGenerar(periodo: EjercicioMes) {
    this.dialog
      .open(PagoIsrModalComponent, {
        data: { ejercicio: periodo.ejercicio, mes: periodo.mes }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.GenerarPagoIsr({ periodo, params: res })
          );
        }
      });
  }

  printReport() {
    /*
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
          this.reportService.runReport(`contabilidad/rows/print`, res);
        }
      });
      */
  }
}
