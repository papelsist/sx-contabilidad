import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Diot } from '../../models';
import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { EjercicioMes } from '../../../models/ejercicio-mes';
import { DiotService } from 'app/saldos/services/diot.service';

@Component({
  selector: 'sx-diot',
  templateUrl: './diot.component.html',
  styleUrls: ['./diot.component.scss']
})
export class DiotComponent implements OnInit, OnDestroy {
  search = '';
  diot$: Observable<Diot[]>;

  periodo: EjercicioMes;

  destroy$ = new Subject<boolean>();
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService,
    private dialogService: TdDialogService,
    private service: DiotService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getDiotLoading));
    this.diot$ = this.store.pipe(select(fromStore.getAllDiot));

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

  onSelect(event: Diot) {}

  reload(periodo: EjercicioMes) {
    this.store.dispatch(new fromStore.LoadDiot({ periodo }));
  }

  onFilter(event) {}

  onGenerar(periodo: EjercicioMes) {
    this.dialogService
      .openConfirm({
        title: `Generar DIOT`,
        message: `Periodo ${periodo.ejercicio} / ${periodo.mes}`,
        acceptButton: 'GENERAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          console.log('Generar DIOT', res);
          this.store.dispatch(new fromStore.GenerarDiot({ periodo }));
        }
      });
  }

  onGenerarArchivo(periodo: EjercicioMes) {
    // this.store.dispatch(new fromStore.GenerarArchivoDiot({ periodo }));
    this.service.downloadDiot(periodo);
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
          this.reportService.runReport(`contabilidad/diot/print`, res);
        }
      });
      */
  }
}
