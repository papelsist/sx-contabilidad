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
} from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

import { Balanza } from "../../models";

@Component({
  selector: "sx-balanzas-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./balanzas-table.component.html",
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
export class BalanzasTableComponent implements OnInit, OnChanges {
  @Input()
  balanzas: Balanza[] = [];
  @Input()
  filter: string;
  dataSource = new MatTableDataSource<Balanza>([]);

  @Input()
  selected: number;

  @Input()
  displayColumns = [
    "ejercicio",
    "mes",
    "tipo",
    "dateCreated",
    "lastUpdated",
    "updateUser",
    "fileName",
    "status"
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

  constructor() {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.balanzas && changes.balanzas.currentValue) {
      this.dataSource.data = changes.balanzas.currentValue;
    }
    if (changes.filter) {
      const s = changes.filter.currentValue || "";
      this.dataSource.filter = s.toLowerCase();
    }
  }

  onXml(event: Event, cat: Balanza) {
    event.stopPropagation();
    this.xml.emit(cat);
  }
  onDowndload(event: Event, cat: Balanza) {
    event.stopPropagation();
    this.download.emit(cat);
  }
}
