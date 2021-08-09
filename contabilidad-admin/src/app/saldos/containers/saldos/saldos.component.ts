import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/movimiento.actions';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SaldoPorCuentaContable } from '../../models';
import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { EjercicioMes } from '../../../models/ejercicio-mes';
import { AuxiliarContableDialogComponent } from 'app/saldos/components';
import { Periodo } from 'app/_core/models/periodo';
import { PolizaDet } from 'app/polizas/models';
// import { getSaldosMayor } from '../../store/selectors/saldos.selectors';

@Component({
  selector: 'sx-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.scss']
})
export class SaldosComponent implements OnInit, OnDestroy {
  search = '';

  saldos$: Observable<SaldoPorCuentaContable[]>;
  movimientos$: Observable<PolizaDet[]>;
  config$: Observable<EjercicioMes>;
  filter: EjercicioMes;
  destroy$ = new Subject<boolean>();
  loading$: Observable<boolean>;
  movimientosLoading$: Observable<boolean>;
  totales: any;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getSaldosLoading));
    this.saldos$ = this.store.pipe(select(fromStore.getSaldos));
    this.config$ = this.store.pipe(select(fromStore.getSaldosPeriodo));
    this.movimientos$ = this.store.pipe(select(fromStore.getMovimientos));
    this.movimientosLoading$ = this.store.pipe(
      select(fromStore.getMovimientosLoading)
    );

    this.config$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filter => (this.filter = filter));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  onSelect(event: SaldoPorCuentaContable) {
    this.store.dispatch(
      new fromRoot.Go({
        path: [`saldos`, event.id]
      })
    );
  }

  reload() {
    this.store.dispatch(new fromStore.LoadSaldos());
  }

  onFilter(event) {
    this.totales = event;
  }

  onActualizar() {
    this.dialogService
      .openConfirm({
        title: `Actualizar saldos de cuentas`,
        message: `Actualiza y corre saldos para todas las cuentas contables`,
        acceptButton: 'Actualizar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.ActualizarSaldos());
        }
      });
  }

  onCierre() {
    this.dialogService
      .openConfirm({
        title: `Cierre mensual`,
        message: `Traslada los saldos al mes siguiente`,
        acceptButton: 'Cerrar mes',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.CierreMensual());
        }
      });
  }
  onPolizaDeCierre() {
    this.dialogService
      .openConfirm({
        title: `CIERRE ANUAL`,
        message: `Generar poliza de cierre anual`,
        acceptButton: 'ACEPTAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.CierreAnual());
        }
      });
  }

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

  onSelectionChanged(event: SaldoPorCuentaContable[]) {
    /*
    const saldo: SaldoPorCuentaContable = event[0];
    const periodo = Periodo.toPeriodo(saldo.ejercicio, saldo.mes);

    this.store.dispatch(
      new fromActions.LoadMovimientosPorCuenta({
        cuenta: event[0].cuenta,
        periodo: periodo
      })
    );
    */
  }
}
