import { Component, OnInit, HostListener } from '@angular/core';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';
import { MatDialog } from '@angular/material';
import {
  CreateActivoModalComponent,
  ActivoBajaModalComponent
} from 'app/activo-fijo/components';
import { EjercicioMesDialogComponent } from 'app/_shared/components';
import { buildCurrentPeriodo } from 'app/models/ejercicio-mes';
import { TdDialogService } from '@covalent/core';

import * as _ from 'lodash';
import { VentaDeActivo } from 'app/activo-fijo/models/venta-de-activo';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'sx-bajas',
  templateUrl: './bajas.component.html',
  styleUrls: ['./bajas.component.scss']
})
export class BajasComponent implements OnInit {
  activos$: Observable<ActivoFijo[]>;
  loading$: Observable<boolean>;
  selected: ActivoFijo;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.selectActivosLoading));
    this.activos$ = this.store.pipe(select(fromStore.selectActivosBajas));
  }

  onSelect(event: ActivoFijo) {
    this.store.dispatch(
      new fromRoot.Go({ path: ['operaciones/activos', event.id] })
    );
  }

  reload() {
    this.store.dispatch(new fromStore.LoadActivos());
  }

  onDeleteBaja(event: ActivoFijo) {
    this.dialogService
      .openConfirm({
        title: 'ELIMINAR BAJA',
        message: 'ACTIVO: ' + event.id,
        cancelButton: 'CANCELAR',
        acceptButton: 'ACEPTAR'
      })
      .afterClosed()
      .subscribe(res => {
        this.store.dispatch(new fromStore.CancelarBaja({ activoId: event.id }));
      });
  }

  onSelection(event: ActivoFijo[]) {
    this.selected = event[0];
  }
}
