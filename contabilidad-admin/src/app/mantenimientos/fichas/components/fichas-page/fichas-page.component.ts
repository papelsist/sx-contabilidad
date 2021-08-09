import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromSelectors from '../../store/ficha.selectors';
import {
  SetFichasFilter,
  LoadFichas,
  UpdateFicha
} from '../../store/ficha.actions';

import { Observable } from 'rxjs';

import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import * as _ from 'lodash';

import { Ficha, FichaFilter } from '../../models/ficha';
import { FichaInfoComponent } from '../ficha-info/ficha.info.component';
import { DiferenciaDialogComponent } from '../diferencia-dialog/diferencia-dialog.component';

@Component({
  selector: 'sx-fichas-page',
  templateUrl: './fichas-page.component.html',
  styleUrls: ['./fichas-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FichasPageComponent implements OnInit {
  fichas$: Observable<Ficha[]>;
  search = '';
  filter$: Observable<FichaFilter>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromSelectors.getFichasLoading));
    this.fichas$ = this.store.pipe(select(fromSelectors.getAllFichas));
    this.filter$ = this.store.pipe(select(fromSelectors.getFichasFilter));
  }

  onFilterChange(filter: FichaFilter) {
    this.store.dispatch(new SetFichasFilter({ filter }));
  }

  reload() {
    this.store.dispatch(new LoadFichas());
  }

  onEdit(event: Ficha) {
    this.dialog
      .open(DiferenciaDialogComponent, {
        data: { ficha: event },
        width: '550px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new UpdateFicha({ update: { id: event.id, changes: res } })
          );
        }
      });
  }

  onSearch(event: string) {
    this.search = event;
  }

  onSelect(ficha: Ficha) {
    this.dialog.open(FichaInfoComponent, {
      data: { ficha: ficha },
      width: '750px'
    });
  }

  getTotal(fichas: Ficha[], tipo: string) {
    return _.sumBy(fichas, item => {
      if (item.tipoDeFicha === tipo) {
        return item.total;
      } else {
        return 0;
      }
    });
  }

  reporteDeRelacionDeFichas(filter: FichaFilter) {
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

  getTipo(filter: FichaFilter) {
    return filter.tipo ? filter.tipo : 'TODAS';
  }

  getSucursal(filter) {
    console.log('suc: ', filter.sucursal);
    return filter.sucursal === '%' ? 'TODAS' : filter.sucursal.nombre;
  }
}
