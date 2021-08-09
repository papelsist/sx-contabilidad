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

import { CuentaContable } from '../../models';

@Component({
  selector: 'sx-cuentas-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cuentas-table.component.html',
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
export class CuentasTableComponent implements OnInit, OnChanges {
  @Input()
  cuentas: CuentaContable[] = [];
  @Input()
  filter: string;
  dataSource = new MatTableDataSource<CuentaContable>([]);

  @Input()
  selected: number;

  @Input() displayColumns = [
    'clave',
    'descripcion',
    'nivel',
    'naturaleza',
    'tipo',
    'subTipo',
    'detalle',
    'deResultado',
    'cuentaSat'
  ];

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Output()
  select = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cuentas && changes.cuentas.currentValue) {
      this.dataSource.data = changes.cuentas.currentValue;
    }
    if (changes.filter) {
      const s = changes.filter.currentValue || '';
      this.dataSource.filter = s.toLowerCase();
    }
  }
}
