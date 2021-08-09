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
import { CorteDeTarjetaAplicacion } from '../../models/corte-de-tarjeta-aplicacion';

@Component({
  selector: 'sx-aplicaciones-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './aplicaciones-table.component.html',
  styleUrls: ['./aplicaciones-table.component.scss']
})
export class AplicacionesTableComponent implements OnInit, OnChanges {
  @Input()
  aplicaciones: CorteDeTarjetaAplicacion[] = [];
  @Input()
  filter: string;
  dataSource = new MatTableDataSource<CorteDeTarjetaAplicacion>([]);

  displayColumns = [
    'sucursal',
    'folio',
    'tipo',
    'fecha',
    'importe',
    'modificado',
    'usuario',
    'operaciones',
    'fechaDeposito'
  ];

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Output()
  select = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  @Output()
  ingreso = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.aplicaciones && changes.aplicaciones.currentValue) {
      this.dataSource.data = changes.aplicaciones.currentValue;
    }
    if (changes.filter) {
      const s = changes.filter.currentValue || '';
      this.dataSource.filter = s.toLowerCase();
    }
  }

  doEdit(event: Event, row: CorteDeTarjetaAplicacion) {
    event.stopPropagation();
    this.edit.emit(row);
  }

  isEditable(row: CorteDeTarjetaAplicacion) {
    return !row.tipo.includes('INGRESO');
  }

  isIngreso(row: CorteDeTarjetaAplicacion) {
    return row.tipo.includes('INGRESO');
  }
}
