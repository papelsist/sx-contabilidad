import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable, Subject } from 'rxjs';

import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';

import { AuxiliarContableDialogComponent } from 'app/saldos/components';
import { Auxiliar } from 'app/saldos/models/auxiliar';
import { Periodo } from 'app/_core/models/periodo';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sx-auxiliar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auxiliar.component.html',
  styleUrls: ['./auxiliar.component.scss']
})
export class AuxiliarComponent implements OnInit, OnDestroy {
  search = '';

  movimientos$: Observable<Auxiliar[]>;
  periodo: Periodo;

  loading$: Observable<boolean>;

  totales$ = new Subject<any>();

  cuentaInicial: string;
  cuentaFinal: string;
  destroy$ = new Subject<boolean>();
  saldoInicial: any;

  private storageKey = 'sx.contabilidad.auxiliar.periodo';

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getAuxiliarLoading));
    this.movimientos$ = this.store.pipe(select(fromStore.getAllAuxiliar));
    this.periodo = Periodo.fromStorage(this.storageKey, Periodo.monthToDay());
    /*
    this.store
      .pipe(
        select(fromStore.getCurrentCuenta),
        takeUntil(this.destroy$)
      )
      .subscribe(r => {
        this.cuentaInicial = r;
      });
      */
    this.movimientos$.pipe(takeUntil(this.destroy$)).subscribe(movs => {
      if (movs.length > 0) {
        this.saldoInicial = movs[0];
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.store.dispatch(new fromStore.CleanAuxiliar());
  }

  reload() {}

  onTotales(event) {
    this.totales$.next(event);
    this.cd.detectChanges();
  }

  generar() {
    this.dialog
      .open(AuxiliarContableDialogComponent, {
        data: {
          periodo: this.periodo,
          cuentaInicial: this.cuentaInicial,
          cuentaFinal: this.cuentaFinal
        },
        width: '750px'
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          const periodo: Periodo = res.periodo;
          this.periodo = periodo;
          Periodo.saveOnStorage(this.storageKey, periodo);
          this.cuentaInicial = res.cuentaInicial;
          this.cuentaFinal = res.cuentaFinal || this.cuentaInicial;
          this.store.dispatch(
            new fromStore.LoadAuxiliar({
              cuentaInicial: res.cuentaInicial,
              cuentaFinal: res.cuentaFinal,
              periodo
            })
          );
        }
      });
  }

  onFilter(event) {
    this.totales$.next(event);
  }

  printAuxiliar() {
    this.dialog
      .open(AuxiliarContableDialogComponent, {
        data: {
          periodo: this.periodo
        },
        width: '750px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(
            `contabilidad/auxiliar/printAuxiliar`,
            res
          );
        }
      });
  }
}
