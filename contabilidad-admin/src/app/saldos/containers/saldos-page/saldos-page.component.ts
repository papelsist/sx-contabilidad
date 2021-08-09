import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { TdMediaService } from '@covalent/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';
import { EjercicioMes } from '../../../models/ejercicio-mes';
import { MatDialog } from '@angular/material';
import { EjercicioMesDialogComponent } from 'app/_shared/components';
import { ReportService } from 'app/reportes/services/report.service';

@Component({
  selector: 'sx-saldos-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './saldos-page.component.html',
  styles: [
    `
      .document {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class SaldosPageComponent implements OnInit {
  navmenu: Object[] = [
    {
      route: 'mayor',
      title: 'SALDOS',
      description: 'Saldos',
      icon: 'storage'
    },
    {
      route: 'balanza',
      title: 'Balanza',
      description: 'Balanza',
      icon: 'my_library_books'
    },

    {
      route: 'diot',
      title: 'DIOT',
      description: '',
      icon: 'grid_off'
    },
    {
      route: 'pagoIsr',
      title: 'Pago ISR',
      description: 'Pago provisional de ISR',
      icon: 'work'
    }
  ];

  auxiliares: any[] = [
    {
      route: 'auxiliar',
      title: 'General',
      description: 'Auxiliar contable',
      icon: 'layers'
    },
    {
      route: 'auxiliarBancos',
      title: 'Bancos',
      description: 'Auxiliar de bancos',
      icon: 'account_balance'
    }
    // {
    //   route: 'estadoDeResultados',
    //   title: 'Estado de resultados',
    //   description: '',
    //   icon: 'assessment'
    // }
  ];

  loading$: Observable<boolean>;
  periodo$: Observable<EjercicioMes>;

  constructor(
    public media: TdMediaService,
    private store: Store<fromStore.State>,
    private reportService: ReportService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getSaldosLoading));
    this.periodo$ = this.store.pipe(select(fromStore.getSaldosPeriodo));
  }

  onCambiarPeriodo(event: EjercicioMes) {
    this.store.dispatch(new fromStore.SetSaldosPeriodo({ periodo: event }));
  }

  estadoDeResultados(periodo: EjercicioMes) {
    this.dialog
      .open(EjercicioMesDialogComponent, { data: { periodo } })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(`contabilidad/estadoDeResultados`, res);
        }
      });
  }
  balanzaDeComprobacion(periodo: EjercicioMes) {
    this.dialog
      .open(EjercicioMesDialogComponent, { data: { periodo } })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(
            `contabilidad/balanzaDeComprobacion`,
            res
          );
        }
      });
  }
  balanceGeneral(periodo: EjercicioMes) {
    this.dialog
      .open(EjercicioMesDialogComponent, { data: { periodo } })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(`contabilidad/balanceGeneral`, res);
        }
      });
  }
}
