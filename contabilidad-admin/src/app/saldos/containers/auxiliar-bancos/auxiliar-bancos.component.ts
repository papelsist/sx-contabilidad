import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/auxiliar.actions';

import { Observable } from 'rxjs';

import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';


import { Auxiliar } from 'app/saldos/models/auxiliar';
import { Periodo } from 'app/_core/models/periodo';
import { AuxiliarBancosDialogComponent } from '../../components/auxiliar-bancos-dialog/auxiliar-bancos-dialog.component';

@Component({
  selector: 'sx-auxiliar-bancos',
  templateUrl: './auxiliar-bancos.component.html',
  styleUrls: ['./auxiliar-bancos.component.scss']
})
export class AuxiliarBancosComponent implements OnInit, OnDestroy {
  search = '';

  movimientos$: Observable<Auxiliar[]>;
  periodo: Periodo;

  loading$: Observable<boolean>;
  totales: any;

  private storageKey = 'sx.contabilidad.auxiliar-bancos.periodo';

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getAuxiliarLoading));
    this.movimientos$ = this.store.pipe(select(fromStore.getAllAuxiliar));
    this.periodo = Periodo.fromStorage(this.storageKey, Periodo.fromNow(45));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromStore.CleanAuxiliar());
  }

  reload() {}

  generar() {
    this.dialog
      .open(AuxiliarBancosDialogComponent, {
        data: { periodo: this.periodo },
        width: '750px'
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          const periodo: Periodo = res.periodo;
          Periodo.saveOnStorage(this.storageKey, periodo);
          this.store.dispatch(
            new fromStore.LoadAuxiliarDeBancos({
              cuentaId: res.cuenta.id,
              periodo
            })
          );
        }
      });
  }

  onFilter(event) {
    this.totales = event;
  }

  printAuxiliar() {
    this.dialog
      .open(AuxiliarBancosDialogComponent, {
        data: {
          periodo: this.periodo
        },
        width: '750px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(
            `contabilidad/saldos/printAuxiliarBancos`,
            res
          );
        }
      });
  }
}
