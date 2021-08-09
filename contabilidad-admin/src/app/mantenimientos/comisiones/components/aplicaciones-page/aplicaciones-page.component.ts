import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromSelectors from '../../store/aplicacion-de-corte.selectors';
import {
  LoadAplicacionesDeCorte,
  UpdateAplicacionDeCorte
} from '../../store/aplicacion-de-corte.actions';

import { Observable } from 'rxjs';

import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import * as _ from 'lodash';

import { CorteDeTarjetaAplicacion } from '../../models';
import { Periodo } from 'app/_core/models/periodo';
import { AplicacionFormComponent } from '../aplicacion-form/aplicacion-form.component';
import { PeriodoDialogComponent } from 'app/_shared/components';
import { FechaDialogComponent } from '../../../../_shared/components/fecha-dilog/fecha.dialog.component';
import { UpdateFechaCorte } from '../../store/aplicacion-de-corte.actions';

@Component({
  selector: 'sx-aplicaciones-page',
  templateUrl: './aplicaciones-page.component.html',
  styleUrls: ['./aplicaciones-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AplicacionesPageComponent implements OnInit {
  aplicaciones$: Observable<CorteDeTarjetaAplicacion[]>;
  search = '';
  periodo = Periodo.mesActual();
  loading$: Observable<boolean>;

  storageKey = 'sx.conta.comisiones-tarjeta';

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(
      select(fromSelectors.getAplicacionesLoading)
    );
    this.periodo = Periodo.fromStorage(this.storageKey, Periodo.fromNow(30));
    this.aplicaciones$ = this.store.pipe(
      select(fromSelectors.getAllAplicaciones)
    );
  }

  reload(periodo: Periodo) {
    this.store.dispatch(new LoadAplicacionesDeCorte({ periodo }));
  }

  onEdit(event: CorteDeTarjetaAplicacion) {
    console.log('Edit:', event);
    if (event.tipo.includes('COMISION')) {
      this.dialog
        .open(AplicacionFormComponent, {
          data: { aplicacion: event },
          width: '550px'
        })
        .afterClosed()
        .subscribe(res => {
          if (res) {
            this.store.dispatch(
              new UpdateAplicacionDeCorte({
                update: { id: event.id, changes: res }
              })
            );
          }
        });
    }
    if (event.tipo.includes('INGRESO')) {
      this.dialog
      .open(FechaDialogComponent, {
        data: { fecha: event.fecha }
      })
      .afterClosed()
      .subscribe((res: Date) => {
        if (res) {
          const aplicacion = {
            id: event.id,
            changes: { fechaDeposito: res.toISOString() }
          };
          this.store.dispatch(new UpdateFechaCorte({update: aplicacion}));
        }
      });
    }
  }

  onSearch(event: string) {
    this.search = event;
  }

  onSelect(corte: CorteDeTarjetaAplicacion) {}

  getTotal(fichas: CorteDeTarjetaAplicacion[]) {
    return _.sumBy(fichas, item => item.importe);
  }

  cambiarPeriodo(periodo: Periodo) {
    this.dialog
      .open(PeriodoDialogComponent, {
        data: { periodo }
      })
      .afterClosed()
      .subscribe(p => {
        if (p) {
          Periodo.saveOnStorage(this.storageKey, p);
          this.reload(p);
        }
      });
  }



  reporteDeCortes() {
    /*
    const dialogRef = this.dialog.open(RelacionFichasComponent, {
      data: { filter }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log('Run report: ', res);
        this.reportService.runReport(
          'tesoreria/fichas/reporteDeRelacionDeFichas',
          res
        );
      }
    });
    */
  }
}
