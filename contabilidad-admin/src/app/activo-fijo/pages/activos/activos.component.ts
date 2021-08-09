import { Component, OnInit, HostListener } from '@angular/core';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';
import { MatDialog } from '@angular/material';
import { ActivoBajaModalComponent } from 'app/activo-fijo/components';
import { EjercicioMesDialogComponent } from 'app/_shared/components';
import { buildCurrentPeriodo } from 'app/models/ejercicio-mes';
import { TdDialogService } from '@covalent/core';

import * as _ from 'lodash';

import { Update } from '@ngrx/entity';

@Component({
  selector: 'sx-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.scss']
})
export class ActivosComponent implements OnInit {
  activos$: Observable<ActivoFijo[]>;
  loading$: Observable<boolean>;
  selected: ActivoFijo[] = [];

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.selectActivosLoading));
    this.activos$ = this.store.pipe(select(fromStore.selectActivos));
  }

  onCreate() {
    this.store.dispatch(
      new fromRoot.Go({ path: ['operaciones/activos/create'] })
    );
  }

  onSelect(event: ActivoFijo) {
    this.store.dispatch(
      new fromRoot.Go({ path: ['operaciones/activos', event.id] })
    );
  }

  reload() {
    this.store.dispatch(new fromStore.LoadActivos());
  }

  onSelection(event: ActivoFijo[]) {
    this.selected = event;
  }

  importarPendientes() {
    this.store.dispatch(new fromStore.GenerarPendientes());
  }

  asignarInpcUso() {
    if (this.selected.length > 0) {
      const ids = this.selected.map(item => item.id);
      this.dialogService
        .openPrompt({
          message: 'INPC PRIMERA MITAD DE USO',
          title: 'ASIGNACION DE INPC',
          acceptButton: 'ACEPTAR',
          cancelButton: 'CANCELAR'
        })
        .afterClosed()
        .subscribe(res => {
          if (res) {
            const inpc = res as number;
            this.store.dispatch(new fromStore.AsignarInpc({ ids, inpc }));
            this.selected = [];
          }
        });
    }
  }

  generarDepreciacion() {
    this.dialog
      .open(EjercicioMesDialogComponent, {
        data: { periodo: buildCurrentPeriodo() }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.GenerarDepreciacionBatch({ periodo: res })
          );
        }
      });
  }

  generarDepreciacionFiscal() {
    this.dialog
      .open(EjercicioMesDialogComponent, {
        data: { periodo: buildCurrentPeriodo() }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.GenerarDepreciacionFiscalBatch({
              ejercicio: res.ejercicio
            })
          );
        }
      });
  }

  onBaja(event: ActivoFijo) {
    if (event.baja) {
      return;
    }
    this.dialog
      .open(ActivoBajaModalComponent, {
        data: { activo: event },
        width: '600px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const baja = {
            ...res
          };
          const activo: Update<ActivoFijo> = {
            id: event.id,
            changes: { baja }
          };
          this.store.dispatch(new fromStore.RegistrarBaja({ activo }));
        }
      });
  }

  @HostListener('document:keydown.meta.i', ['$event'])
  onHotKeyInsert(event) {
    this.onCreate();
  }

  @HostListener('document:keydown.insert', ['$event'])
  onHotKeyInsert2(event) {
    this.onCreate();
  }
}
