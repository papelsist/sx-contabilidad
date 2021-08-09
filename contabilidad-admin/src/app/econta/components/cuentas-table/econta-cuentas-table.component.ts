import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  LOCALE_ID,
  Inject
} from "@angular/core";
import { formatDate, formatCurrency } from "@angular/common";

import {
  GridOptions,
  FilterChangedEvent,
  GridReadyEvent,
  GridApi,
  RowDoubleClickedEvent,
  RowClickedEvent,
  CellClickedEvent,
  CellDoubleClickedEvent,
  ColDef
} from "ag-grid-community";

@Component({
  selector: "sx-econta-cuentas-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style='height: 100%'>
      <ag-grid-angular #agGrid
        class="ag-theme-balham"
        [ngClass]="{myGrid: !printFriendly, print: printFriendly}"
        [gridOptions]="gridOptions"
        [defaultColDef]="defaultColDef"
        [enableFilter]="true"
        [enableSorting]="true"
        [floatingFilter]="false"
        [enableColResize]="true"
        [animateRows]="true"
        [localeText]="localeText"
        (firstDataRendered)="onFirstDataRendered($event)"
        (gridReady)="onGridReady($event)"
        (modelUpdated)="onModelUpdate($event)"
        (selectionChanged)="onSelectionChanged()">
      </ag-grid-angular>
    </div>
  `,
  styles: [
    `
      .myGrid {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class EcontaCuentasTableComponent implements OnInit, OnChanges {
  @Input()
  rows: any[] = [];

  @Input()
  filter: string;

  @Input()
  selected: number;

  gridOptions: GridOptions;
  gridApi: GridApi;
  defaultColDef;

  @Output()
  selectionChange = new EventEmitter<any[]>();

  @Output()
  totalesChanged = new EventEmitter<{
    saldoInicial: number;
    debe: number;
    haber: number;
    saldoFinal: number;
  }>();

  printFriendly = false;

  localeText;

  constructor(
    private cd: ChangeDetectorRef,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.buildColsDef();
    this.defaultColDef = {
      // width: 100,
      editable: false,
      filter: "agTextColumnFilter"
    };

    this.gridOptions.onFilterChanged = this.onFilter;
    this.buildLocalText();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.saldos && changes.saldos.currentValue) {
      // this.gridOptions.rowData = changes.saldos.currentValue;
      if (this.gridApi) {
        this.gridApi.setRowData(changes.saldos.currentValue);
      }
    }
  }

  onModelUpdate(event) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.rows);
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onFilter(event: FilterChangedEvent) {}

  printGrid() {
    this.gridApi.setDomLayout("print");
    this.printFriendly = true;
    this.cd.detectChanges();
    setTimeout(() => {
      print();
      this.gridApi.setDomLayout(null);
      this.printFriendly = false;
      this.cd.detectChanges();
    }, 8000);
  }

  exportData() {
    const params = {
      fileName: "cuentas-sat.csv"
    };
    this.gridApi.exportDataAsCsv(params);
  }

  private buildColsDef(): ColDef[] {
    return [
      { headerName: "Clave", field: "clave", width: 170, pinned: "left" },
      {
        headerName: "Descripcion",
        field: "descripcion",
        width: 300,
        pinned: "left"
      },
      { headerName: "Código SAT", field: "condigo", width: 90 },
      {
        headerName: "Nivel",
        field: "nivel",
        filter: "agNumberColumnFilter",
        width: 60
      },
      {
        headerName: "Naturaleza",
        field: "naturaleza",
        width: 120
      },
      { headerName: "Subcuenta De", field: "subcuentaDe", width: 130 }
    ];
  }

  buildLocalText() {
    this.localeText = {
      page: "página",
      more: "mas",
      to: "a",
      of: "de",
      next: "siguiente",
      last: "ultimo",
      first: "primero",
      previous: "anterior",
      loadingOoo: "cargando...",
      applyFilter: "Aplicar...",
      equals: "igual",
      notEqual: "diferente a",
      lessThan: "menor que",
      greaterThan: "mayor que",
      lessThanOrEqual: "menor o igual",
      greaterThanOrEqual: "mayor o igual",
      inRange: "rango",
      contains: "contiene",
      notContains: "no contiene",
      startsWith: "inicia con",
      endsWith: "termina con",
      filters: "filtros"
    };
  }

  transformCurrency(data) {
    return formatCurrency(data, this.locale, "$");
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectionChange.emit(selectedRows);
  }
}
