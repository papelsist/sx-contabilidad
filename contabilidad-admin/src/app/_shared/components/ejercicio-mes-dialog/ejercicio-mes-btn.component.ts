import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { EjercicioMesDialogComponent } from './ejercicio-mes-dialog.component';
import {
  EjercicioMes,
  buildCurrentPeriodo
} from '../../../models/ejercicio-mes';

@Component({
  selector: 'sx-ejercicio-mes-btn',
  template: `
    <div layout layout-align="center center" class="pad-left">
      <span flex>
        {{periodo.mes}}-{{periodo.ejercicio}}
      </span>
      <button mat-icon-button (click)="select()"  class="pad-left">
        <mat-icon>today</mat-icon>
      </button>
    </div>
  `
})
export class EjercicioMesBtnComponent implements OnInit {
  @Input()
  periodo: EjercicioMes;

  @Output()
  change = new EventEmitter<EjercicioMes>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  select() {
    this.dialog
      .open(EjercicioMesDialogComponent, {
        data: { periodo: this.periodo || buildCurrentPeriodo }
      })
      .afterClosed()
      .subscribe(periodo => {
        if (periodo) {
          this.change.emit(periodo);
        }
      });
  }
}
