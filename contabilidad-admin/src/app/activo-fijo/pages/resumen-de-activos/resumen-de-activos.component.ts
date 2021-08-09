import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivoFijoService } from 'app/activo-fijo/services/activo-fijo.service';
import { finalize } from 'rxjs/operators';
import { Periodo } from 'app/_core/models/periodo';
import {
  EjercicioMes,
  loadEjercicioMesFromStorage,
  saveOnStorage
} from 'app/models/ejercicio-mes';

@Component({
  selector: 'sx-resumen-de-activos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resumen-de-activos.component.html',
  styleUrls: ['./resumen-de-activos.component.scss']
})
export class ResumenDeActivosComponent implements OnInit {
  registros$: Observable<any[]>;
  loading$ = new BehaviorSubject(false);
  periodo: EjercicioMes;
  STORAGE_KEY = 'sx.activo-fijo.resumen.periodo';

  constructor(private service: ActivoFijoService) {}

  ngOnInit() {
    this.periodo = loadEjercicioMesFromStorage(this.STORAGE_KEY);
    this.reload();
  }

  onPeriodoChange(periodo: EjercicioMes) {
    saveOnStorage(this.STORAGE_KEY, periodo);
    this.periodo = periodo;
    this.reload();
  }

  reload() {
    this.loading$.next(true);
    this.registros$ = this.service
      .generarResumen(this.periodo.ejercicio, this.periodo.mes)
      .pipe(finalize(() => this.loading$.next(false)));
  }
}
