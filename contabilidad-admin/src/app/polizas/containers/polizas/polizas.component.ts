import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Poliza, PolizasFilter } from '../../models';
import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { PolizaCreateComponent } from 'app/polizas/components';

@Component({
  selector: 'sx-polizas',
  templateUrl: './polizas.component.html',
  styles: [
    `
      .mat-card {
        width: calc(100% - 15px);
        height: calc(100% - 10px);
      }
    `
  ]
})
export class PolizasComponent implements OnInit, OnDestroy {
  search = '';

  polizas$: Observable<Poliza[]>;
  config$: Observable<PolizasFilter>;
  filter: PolizasFilter;
  loading$: Observable<boolean>;
  destroy$ = new Subject<boolean>();
  searchTerm$: Observable<string>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getPolizasLoading));
    this.polizas$ = this.store.pipe(select(fromStore.getPolizas));
    this.config$ = this.store.pipe(select(fromStore.getCurrentPeriodoGrupo));
    this.searchTerm$ = this.store.pipe(select(fromStore.getPolizasSearchTerm));
    this.registerListeners();
    // this.reload()
  }

  registerListeners() {
    // Listen to CurrentPeriodoGroup changes to reload the container
    this.config$.pipe(takeUntil(this.destroy$)).subscribe(filter => {
      this.filter = filter;
      if (filter.subtipo) {
        this.reload(filter);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  onSelect(event: Poliza) {
    this.store.dispatch(
      new fromRoot.Go({
        path: [`polizas/${event.tipo.toLowerCase()}`, event.id]
      })
    );
  }

  reload(event: PolizasFilter) {
    this.store.dispatch(new fromStore.LoadPolizas({ filter: event }));
  }

  onCreate(event: PolizasFilter) {
    this.dialog
      .open(PolizaCreateComponent, {
        data: { config: event }
      })
      .afterClosed()
      .subscribe(command => {
        if (command) {
          switch (command.subtipo) {
            case 'EGRESO': {
              this.store.dispatch(
                new fromActions.CreatePolizasEgreso({ filter: command })
              );
              break;
            }
            case 'VARIACION_CAMBIARIA':
            case 'CHEQUES_EN_TRANSITO':
            case 'PROVISION_NOMINA':
            case 'CHEQUE':
            case 'CHEQUES':
            case 'TRANSFERENCIA':
            case 'TRANSFERENCIAS':
            case 'TARJETA':
            case 'COBRANZA_CON':
            case 'COBRANZA_COD':
            case 'COBRANZA_CRE':
            case 'VENTAS_CON':
            case 'VENTAS_COD':
            case 'VENTAS_CRE': {
              this.store.dispatch(
                new fromActions.GenerarPolizas({ filter: command })
              );
              break;
            }
            default: {
              this.store.dispatch(
                new fromActions.CreatePoliza({ poliza: command })
              );
            }
          }
        }
      });
  }

  onDelete(event: Poliza) {
    this.dialogService
      .openConfirm({
        message: `Cobro ${event.folio} por ${event.concepto}`,
        title: 'Eliminar poliza',
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromActions.DeletePoliza({ poliza: event }));
        }
      });
  }

  onFilter(event: string) {
    this.store.dispatch(new fromActions.SetPolizasSearchTerm({ term: event }));
  }

  regenerarFolios(event: PolizasFilter) {
    this.dialogService
      .openConfirm({
        title: 'Regenera folios',
        message: `${event.subtipo} (${event.ejercicio} - ${event.mes})`,
        acceptButton: 'ACEPTAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.GenerarFolios({ filter: event }));
        }
      });
  }

  onCopy(event: Poliza) {
    if (event.subtipo === 'CIERRE_MENSUAL') {
      this.dialogService
        .openConfirm({
          title: 'COPIAR POLIZA AL SIGUIENTE PERIODO ',
          message: `PÓLIZA: ${event.folio} ${
            event.concepto
          } ***(NO OLVIDE CAMBIAR EL PERIODO) ***`,
          acceptButton: 'ACEPTAR',
          cancelButton: 'CANCELAR',
          minWidth: '550px'
        })
        .afterClosed()
        .subscribe(res => {
          if (res) {
            this.store.dispatch(
              new fromStore.CopiarPoliza({ polizaId: event.id })
            );
          }
        });
    }
  }
}
