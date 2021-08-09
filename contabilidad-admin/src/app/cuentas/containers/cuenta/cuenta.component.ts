import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { CuentaContable } from '../../models';

import { TdDialogService } from '@covalent/core';
import { Update } from '@ngrx/entity';
import { CuentaCreateDialogComponent } from 'app/cuentas/components';

@Component({
  selector: 'sx-cuenta-contable',
  template: `
  <td-layout-nav  navigationRoute="/" *ngIf="cuenta$ | async as cuenta">
    <div td-toolbar-content layout="row" layout-align="start center" flex>
      <button mat-icon-button td-menu-button tdLayoutToggle>
        <mat-icon>menu</mat-icon>
      </button>
      <span [routerLink]="['/cuentas']" class="cursor-pointer">
        Catálogo de Cuentas
      </span>
      <span flex></span>
      <span>Cuenta: {{cuenta.clave}} {{cuenta.descripcion}}</span>
      <span flex></span>
      <sx-logout-button></sx-logout-button>
    </div>
    <div layout>
      <div flex="60">
        <sx-cuenta-form [cuenta]="cuenta" (cancel)="onCancel(cuenta)" (save)="onSave($event)"
          (update)="onUpdate($event)"
          (delete)="onDelete($event)"
          (agregar)="onAgregar($event)">
        </sx-cuenta-form>
      </div>
      <div flex>
        <mat-card>
          <sx-search-title title="Sub cuentas" (search)="search = $event"></sx-search-title>
          <mat-divider></mat-divider>
          <sx-cuentas-table [cuentas]="cuenta.subcuentas" [displayColumns]="columns" (select)="onSelect($event)" [filter]="search">
          </sx-cuentas-table>
        </mat-card>
      </div>
    </div>

  </td-layout-nav>

  `
})
export class CuentaComponent implements OnInit, OnDestroy {
  cuenta$: Observable<CuentaContable>;
  loading$: Observable<boolean>;
  columns = ['clave', 'descripcion', 'detalle', 'cuentaSat'];
  search: string;

  constructor(
    private store: Store<fromStore.State>,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.cuenta$ = this.store.pipe(select(fromStore.getSelectedCuenta));
    this.loading$ = this.store.select(fromStore.getCuentasLoading);
  }

  ngOnDestroy() {}

  onCancel(event) {
    this.store.dispatch(new fromRoot.Back());
  }

  onSave(event: CuentaContable) {
    this.store.dispatch(new fromStore.CreateCuenta({ cuenta: event }));
  }

  onUpdate(cuenta: Update<CuentaContable>) {
    this.store.dispatch(new fromStore.UpdateCuenta({ cuenta }));
  }

  onSelect(cuenta: CuentaContable) {
    this.store.dispatch(new fromRoot.Go({ path: ['cuentas', cuenta.id] }));
  }

  onAgregar(cuenta: CuentaContable) {
    this.dialogService
      .open(CuentaCreateDialogComponent, { data: { padre: cuenta } })
      .afterClosed()
      .subscribe((nva: CuentaContable) => {
        if (nva) {
          nva.nivel = cuenta.nivel + 1;
          cuenta.subcuentas.push(nva);
          this.store.dispatch(
            new fromStore.UpdateCuenta({
              cuenta: { id: cuenta.id, changes: cuenta }
            })
          );
        }
      });
  }

  onDelete(cuenta: CuentaContable) {
    this.dialogService
      .openConfirm({
        message: `Clave ${cuenta.clave}`,
        title: 'Eliminar cuenta contable',
        acceptButton: 'Eliminar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.DeleteCuenta({ cuenta }));
        }
      });
  }
}
