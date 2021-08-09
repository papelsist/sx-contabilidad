import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Poliza } from '../../models';

@Component({
  selector: 'sx-polizas-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './polizas-table.component.html',
  styles: [
    `
      table {
        width: 100%;
        max-height: 500px;
        overflow: auto;
      }
      .mat-cell {
        font-size: 11px;
      }
      .mat-row {
        height: 30px;
      }
      .mat-column-descripcion {
        max-width: 200px;
      }
      .mat-column-nivel {
        max-width: 90px;
      }
      .mat-column-tipo {
        max-width: 90px;
      }
    `
  ]
})
export class PolizasTableComponent implements OnInit, OnChanges {
  @Input()
  polizas: Poliza[] = [];
  @Input()
  filter: string;
  dataSource = new MatTableDataSource<Poliza>([]);

  @Input()
  selected: number;

  @Input()
  displayColumns = [
    'ejercicio',
    'mes',
    'folio',
    // 'tipo',
    // 'subtipo',
    'concepto',
    'sucursal',
    'fecha',
    'debe',
    'haber',
    'cuadre',
    'manual',
    'cierre',
    'updateUser',
    'operaciones'
  ];

  @ViewChild(MatSort)
  sort: MatSort;

  @Output()
  select = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  @Output()
  copy = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.polizas && changes.polizas.currentValue) {
      this.dataSource.data = changes.polizas.currentValue;
    }
    if (changes.filter) {
      const s = changes.filter.currentValue || '';
      this.dataSource.filter = s.toLowerCase();
    }
  }

  onCopy(event: Event, row: Poliza) {
    event.stopPropagation();
    this.copy.emit(row);
  }
}
