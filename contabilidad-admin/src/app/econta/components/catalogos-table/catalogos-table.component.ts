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

import { Catalogo } from "../../models";

@Component({
  selector: "sx-catalogos-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./catalogos-table.component.html",
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
export class CatalogosTableComponent implements OnInit, OnChanges {
  @Input()
  catalogos: Catalogo[] = [];
  @Input()
  filter: string;
  dataSource = new MatTableDataSource<Catalogo>([]);

  @Input()
  selected: number;

  @Input()
  displayColumns = [
    "ejercicio",
    "mes",
    "emisor",
    "dateCreated",
    "lastUpdated",
    "updateUser",
    "fileName",
    "operaciones"
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
    if (changes.catalogos && changes.catalogos.currentValue) {
      this.dataSource.data = changes.catalogos.currentValue;
    }
    if (changes.filter) {
      const s = changes.filter.currentValue || "";
      this.dataSource.filter = s.toLowerCase();
    }
  }

  onXml(event: Event, cat: Catalogo) {
    event.stopPropagation();
    this.xml.emit(cat);
  }
  onDowndload(event: Event, cat: Catalogo) {
    event.stopPropagation();
    this.download.emit(cat);
  }
}
