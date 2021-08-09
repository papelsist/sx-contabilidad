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

import { CostoPromedio } from '../../models';

@Component({
  selector: 'sx-costos-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './costos-table.component.html',
  styleUrls: ['./costos-table.component.scss']
})
export class CostosTableComponent implements OnInit, OnChanges {
  @Input()
  costos: CostoPromedio[] = [];
  @Input()
  filter: string;
  dataSource = new MatTableDataSource<CostoPromedio>([]);

  @Input()
  displayColumns = [
    'clave',
    'descripcion',
    'costoAnterior',
    'costo',
    'diferencia',
    'modificado',
    'linea',
    'marca',
    'clase'
  ];
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Output()
  select = new EventEmitter();

  @Input()
  selectedId: number;

  constructor() {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.costos && changes.costos.currentValue) {
      this.dataSource.data = changes.costos.currentValue;
    }
    if (changes.filter) {
      const val = changes.filter.currentValue || '';
      this.dataSource.filter = val.toLowerCase();
    }
  }
}
