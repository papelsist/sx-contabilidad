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
import { Inventario } from '../../../models/inventario';

@Component({
  selector: 'sx-movs-por-producto-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movs-por-producto-table.component.html',
  styleUrls: ['./movs-por-producto-table.component.scss']
})
export class MovsPorProductoTableComponent implements OnInit, OnChanges {
  @Input()
  movimientos: Inventario[] = [];

  @Input()
  filter: string;
  dataSource = new MatTableDataSource<any>([]);

  @Input()
  displayColumns = [
    'clave',
    'sucursalNombre',
    'tipo',
    'fecha',
    'documento',
    'renglon',
    'descripcion',
    'unidad',
    'kilos',
    'cantidad',
    'costo',
    'gasto',
    'costop',
    'importeCosto',
    'comentario'
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
    if (changes.movimientos && changes.movimientos.currentValue) {
      this.dataSource.data = changes.movimientos.currentValue;
    }
    if (changes.filter) {
      const val = changes.filter.currentValue || '';
      this.dataSource.filter = val.toLowerCase();
    }
  }
}
