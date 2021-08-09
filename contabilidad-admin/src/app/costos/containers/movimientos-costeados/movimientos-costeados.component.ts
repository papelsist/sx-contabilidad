import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/movimientos-costo.actions';

import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Inventario } from 'app/models/inventario';
import {
  PeriodoCostosDialogComponent,
  CostoProductoDialogComponent
} from '../../components';
import { CostoPromedioService } from 'app/costos/services';
import { TdDialogService, TdLoadingService } from '@covalent/core';

@Component({
  selector: 'sx-movimientos-costeados',
  template: `
  <ng-template tdLoading [tdLoadingUntil]="!(loading$ | async)" tdLoadingStrategy="overlay">
    <mat-card *ngIf="periodo$ | async as periodo">
      <sx-search-title title="Análisis de costos " (search)="onSearch($event)"
        *tdLoading="'procesando'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <div  class="info">
        <button mat-button (click)="cambiarPeriodo(periodo)">
          Ejercicio: {{periodo.mes}} - {{periodo.ejercicio}}
        </button>
      </div>
      <button mat-menu-item class="actions" (click)="reload()"><mat-icon>refresh</mat-icon> Recargar</button>
      <button mat-menu-item class="actions" (click)="actualizarCosto(periodo)">
        Actualizar costo x producto
      </button>
      <button mat-menu-item class="actions" *ngIf="costos$ | async as costos"
        (click)="costearMedidasEspeciales(periodo, costos)">
        Costear medidas especiales
      </button>
      </sx-search-title>
      <mat-divider></mat-divider>
      <mat-tab-group *ngIf="costos$ | async as costos" >
        <mat-tab label="Análisis">
          <sx-costo-producto-table [movimientos]="costos"  [selectedId]="(selected$ | async)?.clave"
          (select)="onSelect($event, periodo)" [filter]="search$ | async"></sx-costo-producto-table>
        </mat-tab>
        <mat-tab label="Movimientos">
          <sx-costo-producto-movs-table [movimientos]="costos"  [selectedId]="(selected$ | async)?.clave"
          (select)="onSelect($event)" [filter]="search$ | async"></sx-costo-producto-movs-table>
        </mat-tab>
      </mat-tab-group>
    </mat-card>
  </ng-template>
    <div *ngIf="selected$ | async as selected">
      <sx-movs-por-producto [producto]="selected" (close)="closeDetailPanel()" [movimientos]="movimientos$ | async"></sx-movs-por-producto>
    </div>

  `
})
export class MovimientosCosteadosComponent implements OnInit {
  costos$: Observable<any[]>;
  selected$: Observable<any>;
  periodo$: Observable<{ ejercicio: number; mes: number }>;
  search$ = new Subject<string>();
  movimientos$: Observable<Inventario[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private dialogService: TdDialogService,
    private service: CostoPromedioService,
    private loadingService: TdLoadingService
  ) {}

  ngOnInit() {
    this.periodo$ = this.store.pipe(
      select(fromStore.getMovimientosCostoPeriodo)
    );
    this.costos$ = this.store.pipe(select(fromStore.getAllMovimientosCosto));
    this.selected$ = this.store.pipe(select(fromStore.getSelectedProducto));
    this.movimientos$ = this.store.pipe(select(fromStore.getAllMovimientos));
    this.loading$ = this.store.pipe(
      select(fromStore.getMovimientosCostoLoading)
    );
    // this.costos$.subscribe(data => console.log('Data: ', data));
  }

  onSelect(event: any, periodo: { ejercicio: number; mes: number }) {
    this.store.dispatch(
      new fromActions.SelectCurrentProducto({ selected: event.clave })
    );
  }

  onSearch(event: string) {
    this.search$.next(event);
  }

  reload() {
    this.store.dispatch(new fromStore.LoadMovmientosCosto());
  }

  cambiarPeriodo(event: { ejercicio: number; mes: number }) {
    this.dialog
      .open(PeriodoCostosDialogComponent, { data: { periodo: event } })
      .afterClosed()
      .subscribe(periodo => {
        if (periodo) {
          this.store.dispatch(
            new fromActions.SetPeriodoDeMovmientosCosto({ periodo })
          );
        }
      });
  }

  closeDetailPanel() {
    this.store.dispatch(
      new fromActions.SelectCurrentProducto({ selected: null })
    );
  }

  actualizarCosto(event: { ejercicio: number; mes: number }) {
    this.dialog
      .open(CostoProductoDialogComponent, {
        data: { periodo: event },
        width: '650px'
      })
      .afterClosed()
      .subscribe(producto => {
        if (producto) {
          this.loadingService.register('procesando');
          this.service
            .calcularPorProducto(event, producto)
            .pipe(finalize(() => this.loadingService.resolve('procesando')))
            .subscribe(
              () => {
                console.log('Exito: ......');
              },
              error => console.error('Error calculando', error)
            );
        }
      });
  }

  costearMedidasEspeciales(
    event: { ejercicio: number; mes: number },
    rows: any[]
  ) {
    const especiales = rows
      .filter(item => !item.deLinea)
      .map(item => item.clave);
    this.dialogService
      .openConfirm({
        title: 'Actualizar costo de medidas especiales',
        message: `Ejercicio: ${event.ejercicio} Mes: ${event.mes} Productos: ${
          especiales.length
        }`,
        acceptButton: 'Actualizar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadingService.register('procesando');
          this.service
            .costeoMedidasEspeciales(event, especiales)
            .pipe(finalize(() => this.loadingService.resolve('procesando')))
            .subscribe(
              () => {
                console.log('Exito: ......');
              },
              error => console.error('Error calculando', error)
            );
        }
      });
  }
}
