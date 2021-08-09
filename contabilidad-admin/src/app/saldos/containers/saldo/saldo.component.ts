import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/movimiento.actions';
import * as fromMovimientos from '../../store/actions/movimiento.actions';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Periodo } from 'app/_core/models/periodo';
import { SaldoPorCuentaContable } from 'app/saldos/models';

import { PolizaDet } from 'app/polizas/models';
import { MatDialog } from '@angular/material';
import { ReclasificarBatchModalComponent } from 'app/saldos/components';

@Component({
  selector: 'sx-saldo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {
  saldo$: Observable<SaldoPorCuentaContable>;
  children$: Observable<SaldoPorCuentaContable[]>;

  search$ = new BehaviorSubject<string>('');
  movimientos$: Observable<PolizaDet[]>;
  loading$: Observable<boolean>;

  selected: Partial<PolizaDet>[] = [];
  selectedSaldo: Partial<SaldoPorCuentaContable> = null;

  totales: { debe: number; haber: number } = { debe: 0.0, haber: 0.0 };

  totalesMovimientos: { debe: number; haber: number } = {
    debe: 0.0,
    haber: 0.0
  };

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.saldo$ = this.store.pipe(select(fromStore.getSelectedSaldo));
    this.children$ = this.saldo$.pipe(map(saldo => saldo.children));
    this.movimientos$ = this.store.pipe(select(fromStore.getMovimientos));
    this.loading$ = this.store.pipe(select(fromStore.getMovimientosLoading));
  }

  reload(saldo: SaldoPorCuentaContable) {}

  getTitle(saldo: SaldoPorCuentaContable): string {
    return `Cunta: ${saldo.descripcion} (${saldo.clave})`;
  }

  onDrill(saldo: SaldoPorCuentaContable) {
    if (!saldo.detalle) {
      this.store.dispatch(
        new fromRoot.Go({ path: ['saldos/mayor', saldo.id] })
      );
    }
  }

  onSelection(event: any[]) {
    const saldo: SaldoPorCuentaContable = event[0];
    this.selectedSaldo = saldo;

    if (saldo.nivel > 1) {
      const periodo = Periodo.toPeriodo(saldo.ejercicio, saldo.mes);
      this.store.dispatch(
        new fromActions.LoadMovimientosPorCuenta({
          cuenta: event[0].cuenta,
          periodo: periodo
        })
      );
    }
  }

  back() {
    this.store.dispatch(new fromRoot.Back());
  }

  onPartidasSelected(event: Partial<PolizaDet>[]) {
    this.selected = event;
  }

  onTotales(event) {
    this.totales = event;
  }
  onTotalesMovimientos(event) {
    this.totalesMovimientos = event;
  }

  onReclasificar() {
    this.dialog
      .open(ReclasificarBatchModalComponent, {
        data: { partidas: this.selected },
        width: '700px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          // console.log('Reclasificar COMMAND: ', res);
          this.store.dispatch(new fromMovimientos.ReclasificarMovimientos(res));
        }
      });
  }

  recalcularSaldo(event: SaldoPorCuentaContable) {
    console.log('Actualizando saldo: ', event);
  }
}
