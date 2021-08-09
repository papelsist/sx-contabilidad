import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Poliza } from '../../models';

import { TdDialogService } from '@covalent/core';
import * as moment from 'moment';
import { ReportService } from 'app/reportes/services/report.service';
import { CobranzaSupportService } from 'app/polizas/services/conbranza-support.service';

@Component({
  selector: 'sx-poliza',
  template: `
  <ng-template tdLoading [tdLoadingUntil]="!(loading$ | async)"  tdLoadingStrategy="overlay" >
    <div *ngIf="poliza$ | async as poliza">
      <sx-poliza-form
        [poliza]="poliza"
        (cancel)="onCancel(poliza)"
        (update)="onUpdate($event)"
        (recalcular)="onRecalcular($event)"
        (delete)="onDelete($event)"
        (cerrar)="onCerrar($event)"
        (print)="onPrint($event)"
        (comprobantes)="onComprobantes($event)"
        (toogleManual)="onManual($event)"
        (generarComplementosDePago)="onGenerarComplementosDePago($event)"
        (cambiarFormaDePago)="onCambioDeFormaDePago($event)"
        (prorratearPartida)="onProrratear(poliza, $event)">
      </sx-poliza-form>
    </div>
  </ng-template>
  `
})
export class PolizaComponent implements OnInit {
  poliza$: Observable<Poliza>;
  facturasPendientes$: Observable<Poliza[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialogService: TdDialogService,
    private reportService: ReportService,
    private cobranzaService: CobranzaSupportService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getPolizasLoading));
    this.poliza$ = this.store.pipe(select(fromStore.getSelectedPoliza));
  }

  onCancel(poliza: Poliza) {
    this.store.dispatch(
      new fromRoot.Go({
        path: [`polizas/${poliza.tipo.toLowerCase()}`],
        query: { tipo: poliza.tipo, subtipo: poliza.subtipo }
      })
    );
  }

  onRecalcular(event: Poliza) {
    this.store.dispatch(new fromStore.RecalcularPoliza({ polizaId: event.id }));
    // if (!event.cierre) {
    // }
  }

  onUpdate(event: { id: number; changes: Partial<Poliza> }) {
    this.store.dispatch(new fromStore.UpdatePoliza({ poliza: event }));
  }

  onDelete(event: Poliza) {
    this.dialogService
      .openConfirm({
        title: `Eliminar poliza ${event.tipo}`,
        message: `${event.subtipo} Folio: ${event.folio} Fecha: ${moment(
          event.fecha
        ).format('DD/MM/YYYY')}`,
        acceptButton: 'Eliminar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.DeletePoliza({ poliza: event }));
        }
      });
  }

  onPrint(event: Poliza) {
    this.reportService.runReport(`contabilidad/polizas/print/${event.id}`, {});
  }

  onCerrar(event: Poliza) {
    this.dialogService
      .openConfirm({
        title: `Cerrar Poliza ${event.folio}`,
        message: `Cierrar poliza y actualizar saldos`,
        acceptButton: 'Cerrar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const update = {
            id: event.id,
            changes: { cierre: new Date().toISOString() }
          };
          this.store.dispatch(
            new fromStore.CerrarPoliza({ polizaId: event.id })
          );
        }
      });
  }

  onManual(event: Poliza) {
    this.dialogService
      .openConfirm({
        title: 'Mantenimiento de la póliza',
        message: `Cambiar a : ${!event.manual ? 'MANUAL' : 'AUTOMATICA'}`,
        acceptButton: 'ACEPTAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const update = { id: event.id, changes: { manual: !event.manual } };
          this.store.dispatch(new fromStore.UpdatePoliza({ poliza: update }));
        }
      });
  }

  onComprobantes(event: { id: number; tipo: 'N' | 'E' | 'P' }) {
    this.reportService.runReport(
      `contabilidad/polizas/printComprobantes/${event.id}`,
      { tipo: event.tipo }
    );
  }

  onGenerarComplementosDePago(event: Poliza) {
    this.dialogService
      .openConfirm({
        title: 'COMPLEMENTOS DE PAGO',
        message: 'GENERAR COMPLEMENTOS DE PAGO',
        acceptButton: 'ACEPTAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.GenerarComplementos({ polizaId: event.id })
          );
        }
      });
  }

  onCambioDeFormaDePago(event: { id: string; formaDePago: string }) {
    this.cobranzaService
      .ajustarFormaDePago(event.id, event.formaDePago)
      .subscribe(
        response => {
          this.dialogService
            .openAlert({
              title: 'ACTUALIZACION EXITOSA',
              message:
                'Debe actualizar la poliza para que los cambios tengan efecto',
              closeButton: 'CERRAR'
            })
            .afterClosed()
            .subscribe(() => {});
        },
        err => {
          this.dialogService
            .openAlert({
              title: 'ERROR EN EL SERVIDOR',
              message: err.message,
              closeButton: 'CERRAR'
            })
            .afterClosed()
            .subscribe(() => {});
        }
      );
  }

  onProrratear(poliza: Poliza, event: { polizaDet: number; data: any }) {
    const command = {
      polizaId: poliza.id,
      ...event
    };
    this.store.dispatch(new fromStore.ProrratearPartida(command));
  }
}
