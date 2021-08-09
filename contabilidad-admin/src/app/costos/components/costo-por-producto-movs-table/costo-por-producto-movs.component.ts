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

@Component({
  selector: 'sx-costo-producto-movs-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './costo-por-producto-movs.component.html',
  styleUrls: ['./costo-por-producto-movs.component.scss']
})
export class CostoPorProductoMovsTableComponent implements OnInit, OnChanges {
  @Input()
  movimientos: any[] = [];

  @Input()
  filter: string;
  dataSource = new MatTableDataSource<any>([]);

  @Input()
  displayColumns = [
    'clave',
    'deLinea',
    // 'descripcion',
    'comsSinAUni',
    'comsSinA',
    'comsUni',
    'comsCosto',
    'comsFlete',
    'comsMaq',
    'movsUni',
    'movsCosto',
    'decUni',
    'decCosto',
    'trasladosUni',
    'trasladosCosto',
    'trsSalUni',
    'trsSalCosto',
    'trsEntUni',
    'trsEntCosto',
    'devUni',
    'devCosto',
    'vtaUni',
    'vtaCosto'
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
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.movimientos && changes.movimientos.currentValue) {
      this.dataSource.data = changes.movimientos.currentValue;
    }
    if (changes.filter) {
      const val = changes.filter.currentValue || '';
      this.dataSource.filter = val.toLowerCase();
    }
  }
}
