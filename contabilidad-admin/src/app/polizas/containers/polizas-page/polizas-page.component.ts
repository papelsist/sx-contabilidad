import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { TdMediaService } from '@covalent/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';
import { Grupo } from 'app/polizas/store/reducers/grupo';
import { EjercicioMes } from '../../../models/ejercicio-mes';
import { ReportService } from 'app/reportes/services/report.service';
import { MatDialog } from '@angular/material';
import {
  SucursalFechaDialogComponent,
  VentasDiariasDialogComponent
} from 'app/reportes/components';

@Component({
  selector: 'sx-polizas-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './polizas-page.component.html',
  styles: [
    `
      .document {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class PolizasPageComponent implements OnInit {
  navmenu: Object[] = [
    {
      route: 'ingresos',
      title: 'Ingresos',
      description: 'Pólizas de ingreso',
      icon: 'attach_money'
    },
    {
      route: 'egresos',
      title: 'Egresos',
      description: 'Pólizas de egresos',
      icon: 'settings_backup_restore'
    },
    {
      route: 'diario',
      title: 'Diario',
      description: 'Pólizas de diario',
      icon: 'filter_none'
    }
  ];

  loading$: Observable<boolean>;
  grupos$: Observable<Grupo[]>;
  periodo$: Observable<EjercicioMes>;

  constructor(
    public media: TdMediaService,
    private store: Store<fromStore.State>,
    private reportService: ReportService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.grupos$ = this.store.pipe(select(fromStore.getGrupos));
    this.periodo$ = this.store.pipe(select(fromStore.getPeriodoDePolizas));
    this.periodo$.subscribe(per => {
      const ejercicio = per.ejercicio;
      this.store.dispatch(new fromStore.SetMenuContext({ ejercicio }));
    });
  }

  onCambiarPeriodo(event: EjercicioMes) {
    this.store.dispatch(new fromStore.SetPeriodoDePoliza({ periodo: event }));
  }

  reporteCobranzaCON() {
    this.dialog
      .open(SucursalFechaDialogComponent, {
        data: { title: 'Cobranza CONTADO', storeKey: 'sx.cobranza.con.last' }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport('cxc/cobro/reporteDeCobranzaCON', res);
        }
      });
  }

  reporteCobranzaCOD() {
    this.dialog
      .open(SucursalFechaDialogComponent, {
        data: { title: 'Cobranza COD', storeKey: 'sx.cobranza.cod.last' }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport('cxc/cobro/reporteDeCobranzaCOD', res);
        }
      });
  }

  reporteCobranzaCRE() {
    this.dialog
      .open(SucursalFechaDialogComponent, {
        data: {
          title: 'Cobranza CRE',
          sucursalOpcional: true,
          storeKey: 'sx.reports.sucursal-dialog-last',
          carteras: ['CRE']
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          // console.log('Params: ', res);
          this.reportService.runReport('cxc/cobro/reporteDeCobranza', res);
        }
      });
  }

  comisionesDeTarjeta() {
    this.dialog
      .open(SucursalFechaDialogComponent, {
        data: {
          storeKey: 'sx.reports.sucursal-dialog-last'
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(
            'cxc/cobro/reporteComisionTarjetas',
            res
          );
        }
      });
  }

  reporteCarteraCOD() {
    this.dialog
      .open(SucursalFechaDialogComponent, {
        data: { title: 'Cartera COD', storeKey: 'sx.cartera.cod.last' }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport('cxc/carteraCod', res);
        }
      });
  }
}
