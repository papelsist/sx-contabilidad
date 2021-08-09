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
import { Ficha } from '../../models/ficha';

@Component({
  selector: 'sx-fichas-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fichas-table.component.html',
  styleUrls: ['./fichas-table.component.scss']
})
export class FichasTableComponent implements OnInit, OnChanges {
  @Input()
  fichas: Ficha[] = [];
  @Input()
  filter: string;
  dataSource = new MatTableDataSource<Ficha>([]);

  displayColumns = [
    'origen',
    'sucursalNombre',
    'folio',
    'fecha',
    'tipoDeFicha',
    'banco',
    'cuenta',
    'total',
    'diferencia',
    'diferenciaTipo',
    'diferenciaUsuario',
    'modificado',
    'usuario',
    'operaciones'
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
    if (changes.fichas && changes.fichas.currentValue) {
      this.dataSource.data = changes.fichas.currentValue;
    }
    if (changes.filter) {
      const s = changes.filter.currentValue || '';
      this.dataSource.filter = s.toLowerCase();
    }
  }

  doDelete(event: Event, row: Ficha) {
    event.stopPropagation();
    this.delete.emit(row);
  }

  doEdit(event: Event, row: Ficha) {
    event.stopPropagation();
    this.edit.emit(row);
  }

  doRegistrarIngreso(event: Event, row: Ficha) {
    event.stopPropagation();
    this.ingreso.emit(row);
  }

  isEditable(row: Ficha) {
    return !row.ingreso && row.origen !== 'CON' && row.origen !== 'COD';
  }

  isDeletable(row: Ficha) {
    return row.origen !== 'CON' && row.origen !== 'COD';
  }
}
