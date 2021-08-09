import { Component, OnInit } from '@angular/core';

import { TdMediaService } from '@covalent/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import {
  CalculoPorProductoDialogComponent,
  InventarioCosteadoDialogComponent,
  ReportComsSinAnalizarComponent,
  ReportFacturasAnalizadasComponent,
  ReportMovsCosteadosDoctoComponent,
  ReportMovsCosteadosDetComponent
} from '../../components';
import { ReportService } from '../../../reportes/services/report.service';
import {
  KardexReportComponent,
  VentasDiariasDialogComponent,
  RepPeriodoSucursalComponent
} from '../../../reportes/components';
import { Periodo } from '../../../_core/models/periodo';
import { PeriodoDialogComponent } from '../../../_shared/components';

@Component({
  selector: 'sx-costos-page',
  templateUrl: './costos-page.component.html',
  styles: [
    `
      .document-panel {
        min-height: 400px;
      }
    `
  ]
})
export class CostosPageComponent implements OnInit {
  navmenu: Object[] = [
    {
      route: 'promedios',
      title: 'Costos promedio',
      description: 'Resumen de costos promedio',
      icon: 'account_balance_wallet'
    },
    {
      route: 'movimientos',
      title: 'Movimientos ',
      description: 'Movimientos costeados',
      icon: 'swap_horiz'
    }
  ];

  loading$: Observable<boolean>;
  periodo$: Observable<{ ejercicio: number; mes: number }>;

  constructor(
    public media: TdMediaService,
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getCostosLoading));
    this.periodo$ = this.store.pipe(select(fromStore.getCostosPeriodo));
  }

  comsSinAnalizar() {
    this.dialog
      .open(ReportComsSinAnalizarComponent, {
        data: {},
        width: '500px'
      })
      .afterClosed()
      .subscribe(params => {
        if (params) {
          this.reportService.runReport(
            'analisisDeFactura/comsSinAnalizar',
            params
          );
        }
      });
  }

  calculoDeCostoPromedio() {
    this.dialog
      .open(CalculoPorProductoDialogComponent, {
        data: { title: 'Cálculo de costo promedio' }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(`costos/calculoDeCostoPromedio`, res);
        }
      });
  }

  inventarioCosteado() {
    this.dialog
      .open(InventarioCosteadoDialogComponent, {
        data: { title: 'Inventarios costeados' }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(`costos/inventarioCosteado`, res);
        }
      });
  }

  movimientosCosteados(periodo: { ejercicio: number; mes: number }) {
    this.dialog
      .open(CalculoPorProductoDialogComponent, {
        data: {
          title: 'Movimientos costeados',
          productoRequerido: false,
          periodo
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(`costos/movimientosCosteados`, res);
        }
      });
  }

  kardex(event: { ejercicio: number; mes: number }) {
    const periodo = Periodo.toPeriodo(event.ejercicio, event.mes);
    this.dialog
      .open(KardexReportComponent, { data: { periodo } })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(`inventario/printKardex`, res);
        }
      });
  }

  mercanciaTransito(event: { ejercicio: number; mes: number }) {
    const periodo = Periodo.toPeriodo(event.ejercicio, event.mes);
    this.dialog
      .open(PeriodoDialogComponent, { data: { periodo } })
      .afterClosed()
      .subscribe((res: Periodo) => {
        if (res) {
          console.log('Periodo: ', res);
          const params = {
            fechaInicial: res.fechaInicial.toISOString(),
            fechaFinal: res.fechaFinal.toISOString()
          };
          this.reportService.runReport(`costos/mercanciaEnTransito`, params);
        }
      });
  }

  facturasAnalizadas() {
    this.dialog
      .open(ReportFacturasAnalizadasComponent, {
        data: {},
        width: '500px'
      })
      .afterClosed()
      .subscribe(params => {
        if (params) {
          this.reportService.runReport(`costos/facturasAnalizadas`, params);
        }
      });
  }

  movsCosteadosDocto() {
    this.dialog
      .open(ReportMovsCosteadosDoctoComponent, {
        data: {},
        width: '500px'
      })
      .afterClosed()
      .subscribe(params => {
        if (params) {
          this.reportService.runReport(
            `costos/movimientosCosteadosDeDocumentos`,
            params
          );
        }
      });
  }

  movsCosteadosDet() {
    this.dialog
      .open(ReportMovsCosteadosDetComponent, {
        data: {},
        width: '500px'
      })
      .afterClosed()
      .subscribe(params => {
        if (params) {
          this.reportService.runReport(
            `costos/movimientosCosteadosDet`,
            params
          );
        }
      });
  }

  ventasDiarias(event: { ejercicio: number; mes: number }) {
    const periodo = Periodo.toPeriodo(event.ejercicio, event.mes);
    this.dialog
      .open(VentasDiariasDialogComponent, { data: { periodo } })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(`inventario/ventasDiarias`, res);
        }
      });
  }

  analisisDevoluciones() {
    this.dialog
      .open(RepPeriodoSucursalComponent, {
        data: {},
        width: '500px'
      })
      .afterClosed()
      .subscribe(params => {
        if (params) {
          this.reportService.runReport('cxp/notas/reporteDeAnalisis', params);
        }
      });
  }
  analisisTransformaciones() {
    this.dialog
      .open(RepPeriodoSucursalComponent, {
        data: {},
        width: '500px'
      })
      .afterClosed()
      .subscribe(params => {
        if (params) {
          this.reportService.runReport(
            'cxp/analisisDeTransformacion/reporteDeAnalisis',
            params
          );
        }
      });
  }
}
