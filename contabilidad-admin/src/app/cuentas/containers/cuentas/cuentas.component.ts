import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/cuentas.actions';
import { CuentaContable, CatalogoFilter } from '../../models';

import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material';

import { ReportService } from 'app/reportes/services/report.service';
import { CuentaCreateDialogComponent } from 'app/cuentas/components';

@Component({
  selector: 'sx-cuentas',
  template: `
    <td-layout-nav  navigationRoute="/">
      <div td-toolbar-content layout="row" layout-align="start center" flex>
        <button mat-icon-button td-menu-button tdLayoutToggle>
          <mat-icon>menu</mat-icon>
        </button>
        <span [routerLink]="['/']" class="cursor-pointer">SX-CONTABILIDAD</span>
        <span flex></span>
        <span>Catálogo de cuentas</span>
        <span flex></span>
        <sx-logout-button></sx-logout-button>
      </div>
      <div layout-gt-sm="row" tdMediaToggle="gt-xs" [mediaClasses]="['push-sm']">
        <mat-card flex>
          <sx-search-title
          title="Cuentas "
          (search)="onSearch($event)">
            <button mat-menu-item class="actions" (click)="onCreate()">
              <mat-icon>add</mat-icon> Nueva cuenta
            </button>
            <sx-cuentas-filter-btn class="options" [filter]="filter$ | async" (change)="onFilter($event)">
            </sx-cuentas-filter-btn>
            <button mat-menu-item class="actions" (click)="reload(filter)" *ngIf="filter$ | async as filter">
              <mat-icon>refresh</mat-icon> Recargar
            </button>

          </sx-search-title>
          <mat-divider></mat-divider>
          <sx-cuentas-table [cuentas]="cuentas$ | async"
            [filter]="search$ | async"
            (select)="onSelect($event)" [selected]="selectedId$ | async">
          </sx-cuentas-table>
        </mat-card>
      </div>
    </td-layout-nav>
  `,
  styles: [
    `
      .mat-card2 {
        width: calc(100% - 15px);
        height: calc(100% - 10px);
      }
    `
  ]
})
export class CuentasComponent implements OnInit {
  cuentas$: Observable<CuentaContable[]>;
  selectedId$: Observable<number>;
  loading$: Observable<boolean>;
  search$: Observable<string>;
  filter$: Observable<CatalogoFilter>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getCuentasLoading));
    this.search$ = this.store.pipe(select(fromStore.getCuentasSearchTerm));
    this.filter$ = this.store.pipe(select(fromStore.getCatalogoFilter));
    this.cuentas$ = this.store.pipe(select(fromStore.getCuentas));
    this.selectedId$ = this.store.pipe(select(fromStore.getSelectedCuentaId));
  }

  onSelect(event: CuentaContable) {
    this.store.dispatch(
      // new fromStore.SetSelectedCuenta({ selectedId: event.id })
      new fromRoot.Go({ path: ['cuentas', event.id] })
    );
  }

  reload(filter: CatalogoFilter) {
    this.store.dispatch(new fromStore.LoadCuentas({ filter }));
  }

  onSearch(event: string) {
    this.store.dispatch(new fromStore.SetCuentasSearchTerm({ term: event }));
  }

  onFilter(event: CatalogoFilter) {
    this.store.dispatch(new fromStore.SetCatalogoFilter({ filter: event }));
  }

  onCreate() {
    this.dialog
      .open(CuentaCreateDialogComponent, { data: {} })
      .afterClosed()
      .subscribe((cuenta: CuentaContable) => {
        if (cuenta) {
          this.store.dispatch(new fromStore.CreateCuenta({ cuenta }));
        }
      });
  }
}
