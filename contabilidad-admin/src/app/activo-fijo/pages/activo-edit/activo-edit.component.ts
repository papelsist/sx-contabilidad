import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable, Subscription } from 'rxjs';
import { Update } from '@ngrx/entity';
import { Depreciacion } from 'app/activo-fijo/models/depreciacion';
import { MatDialog } from '@angular/material';
import { FechaDialogComponent } from 'app/_shared/components';

import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { DepreciacionFiscalComponent } from 'app/activo-fijo/components';
import { DepreciacionFiscal } from 'app/activo-fijo/models/depreciacion-fiscal';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-activo-edit',
  templateUrl: './activo-edit.component.html',
  styleUrls: ['./activo-edit.component.scss']
})
export class ActivoEditComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  activo$: Observable<ActivoFijo>;
  depreciaciones$: Observable<Depreciacion[]>;
  fiscales$: Observable<DepreciacionFiscal[]>;
  acumulada$: Observable<number>;

  selected: Depreciacion[] = [];
  selectedFiscales: DepreciacionFiscal[] = [];

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private dialogService: TdDialogService
  ) {}

  subs: Subscription;

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.selectActivosLoading));
    this.activo$ = this.store.pipe(select(fromStore.selectCurrentActivo));
    this.depreciaciones$ = this.store.pipe(
      select(fromStore.selectDepreciacions)
    );
    this.fiscales$ = this.store.pipe(select(fromStore.selectFiscales));
    this.subs = this.activo$.subscribe(activo => {
      if (activo) {
        // console.log('Cargando depreciaciones...', activo.id);
        this.store.dispatch(
          new fromStore.LoadDepreciaciones({ actovid: activo.id })
        );
        this.store.dispatch(
          new fromStore.LoadDepreciacionesFiscales({ actovid: activo.id })
        );
      }
    });

    this.acumulada$ = this.depreciaciones$.pipe(
      map(rows =>
        rows.map(item => item.depreciacion).reduce((pre, val) => pre + val, 0)
      )
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new fromStore.CleanDepreciaciones());
    this.subs.unsubscribe();
  }

  onUpdate(activo: Update<ActivoFijo>) {
    this.store.dispatch(new fromStore.UpdateActivo({ activo }));
  }

  onBack() {
    this.store.dispatch(new fromRoot.Go({ path: ['operaciones/activos'] }));
  }

  onDelete(af: ActivoFijo) {
    this.dialogService
      .openConfirm({
        title: 'ELIMIAR ACTIVO',
        message: `Seguro que desea eliminar el activo: ${af.id}`,
        acceptButton: 'ELIMINAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          console.log('Eliminar activo: ', af);
          this.store.dispatch(new fromStore.DeleteActivo({ activo: af }));
        }
      });
  }

  crearDepreciacion(activo: ActivoFijo, fecha: Date = new Date()) {
    const minDate = moment(activo.adquisicion).toDate();
    this.dialog
      .open(FechaDialogComponent, { data: { fecha, minDate } })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.CreateDepreciacion({
              activoId: activo.id,
              corte: res
            })
          );
        }
      });
  }

  onSelectionChange(event: Depreciacion[]) {
    this.selected = event;
  }
  onFiscalSelection(event: DepreciacionFiscal[]) {
    this.selectedFiscales = event;
  }

  elimiarDepreciaciones() {
    this.selected.forEach(item => {
      setTimeout(() => {
        this.store.dispatch(
          new fromStore.DeleteDepreciacion({
            activoId: item.activoFijo.id,
            deperciacionId: item.id
          })
        );
      }, 1000);
    });
  }

  depreciacionFiscal(activo: ActivoFijo, acumulada: number) {
    this.dialog
      .open(DepreciacionFiscalComponent, {
        data: { acumulada },
        width: '470px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.CreateDepreciacionFiscal({
              activoId: activo.id,
              depreciacion: res
            })
          );
        }
      });
  }

  elimiarDepreciacionesFiscales() {
    this.selectedFiscales.forEach(item => {
      setTimeout(() => {
        this.store.dispatch(
          new fromStore.DeleteDepreciacionFiscal({
            activoId: item.activoFijo.id,
            deperciacionId: item.id
          })
        );
      }, 1000);
    });
  }
}
