import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';

import { AjusteAnual } from '../../model';
import {
  EjercicioMes,
  loadEjercicioMesFromStorage,
  saveOnStorage
} from 'app/models/ejercicio-mes';

@Component({
  selector: 'sx-inflacion-page',
  templateUrl: './inflacion-page.component.html',
  styleUrls: ['./inflacion-page.component.scss']
})
export class InflacionPageComponent implements OnInit {
  ejercicio: number;

  periodo: EjercicioMes;

  loading$: Observable<boolean>;
  ajustes$: Observable<AjusteAnual[]>;
  activos$: Observable<AjusteAnual[]>;
  pasivos$: Observable<AjusteAnual[]>;

  periodoStorageKey = 'sx.ajuste-anual.periodo';

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.loadEjercicio();
    this.loading$ = this.store.pipe(select(fromStore.selectAjustesLoading));
    this.ajustes$ = this.store.pipe(select(fromStore.selectAjustes));
    this.activos$ = this.store.pipe(select(fromStore.selectActivos));
    this.pasivos$ = this.store.pipe(select(fromStore.selectPasivos));
    this.load();
  }

  load() {
    this.store.dispatch(
      new fromStore.LoadAjustes({ ejercicio: this.ejercicio })
    );
  }

  onPeriodoChange(event: EjercicioMes) {
    this.periodo = event;
    saveOnStorage(this.periodoStorageKey, event);
  }

  private loadEjercicio() {
    const found =
      localStorage.getItem('sx.ajuste-anual-inflacion.ejercicio') || '2018';
    this.ejercicio = parseFloat(found);
    this.periodo = loadEjercicioMesFromStorage(this.periodoStorageKey);
  }

  onGenerar({ ejercicio, mes }) {
    this.store.dispatch(new fromStore.GenerarAjustes({ ejercicio, mes }));
  }
}
