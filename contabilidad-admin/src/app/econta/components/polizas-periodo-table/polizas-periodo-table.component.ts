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

import { PolizasPeriodo } from '../../models';

@Component({
  selector: 'sx-polizas-periodo-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './polizas-periodo-table.component.html',
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
export class PolizasPeriodoTableComponent implements OnInit, OnChanges {
  @Input()
  polizasPeriodo: PolizasPeriodo[] = [];
  @Input()
  filter: string;
  dataSource = new MatTableDataSource<PolizasPeriodo>([]);

  @Input()
  selected: number;

  @Input()
  displayColumns = [
    'id',
    'ejercicio',
    'mes',
    'tipoDeSolicitud',
    'numOrden',
    'numTramite',
    'dateCreated',
    'lastUpdated',
    'updateUser',
    'fileName',
    'operaciones'
  ];

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Output()
  select = new EventEmitter();

  @Output()
  xml = new EventEmitter();

  @Output()
  download = new EventEmitter();
  @Output()
  delete = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.polizasPeriodo && changes.polizasPeriodo.currentValue) {
      this.dataSource.data = changes.polizasPeriodo.currentValue;
    }
    if (changes.filter) {
      const s = changes.filter.currentValue || '';
      this.dataSource.filter = s.toLowerCase();
    }
  }

  onXml(event: Event, cat: PolizasPeriodo) {
    event.stopPropagation();
    this.xml.emit(cat);
  }
  onDowndload(event: Event, cat: PolizasPeriodo) {
    event.stopPropagation();
    this.download.emit(cat);
  }

  onDelete(event: Event, cat: PolizasPeriodo) {
    event.stopPropagation();
    this.delete.emit(cat);
  }
}
