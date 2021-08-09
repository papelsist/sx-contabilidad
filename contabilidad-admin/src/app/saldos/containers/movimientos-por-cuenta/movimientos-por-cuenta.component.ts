import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/movimiento.actions';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Periodo } from 'app/_core/models/periodo';
import { SaldoPorCuentaContable } from 'app/saldos/models';

import { PolizaDet } from 'app/polizas/models';

@Component({
  selector: 'sx-movimientos-por-cuenta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movimientos-por-cuenta.component.html'
})
export class MovimientosPorCuentaComponent implements OnInit, OnDestroy {
  saldo$: Observable<SaldoPorCuentaContable>;
  movimientos$: Observable<PolizaDet[]>;
  destroy$ = new Subject();
  search$ = new BehaviorSubject<string>('');

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.saldo$ = this.store.pipe(select(fromStore.getSelectedSaldo));
    this.saldo$
      .pipe(
        takeUntil(this.destroy$),
        map(saldo => {
          const periodo = Periodo.toPeriodo(saldo.ejercicio, saldo.mes);
          return { periodo, cuenta: saldo.cuenta };
        })
      )
      .subscribe(action =>
        this.store.dispatch(new fromActions.LoadMovimientosPorCuenta(action))
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  reload(saldo: SaldoPorCuentaContable) {
    const periodo = Periodo.toPeriodo(saldo.ejercicio, saldo.mes);
    this.store.dispatch(
      new fromActions.LoadMovimientosPorCuenta({
        cuenta: saldo.cuenta,
        periodo: periodo
      })
    );
  }
}
