import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { Periodo } from 'app/_core/models/periodo';

import { PeriodoDialogComponent } from '../periodo-dialog/periodo-dialog.component';

@Component({
  selector: 'sx-periodo-picker',
  template: `
    <button mat-icon-button [matTooltip]="toolTip" (click)="seleccionar()"><mat-icon>event</mat-icon></button>
  `,
  styles: [``]
})
export class PeriodoPickerComponent implements OnInit {
  @Input() toolTip = 'Cambiar el periodo';

  @Input() periodo = new Periodo();
  @Output() change = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  seleccionar() {
    this.dialog
      .open(PeriodoDialogComponent, {
        data: { periodo: this.periodo }
      })
      .afterClosed()
      .subscribe(res => {
        if (res !== null) {
          this.change.emit(res);
        }
      });
  }
}
