import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  LOCALE_ID,
  Inject
} from "@angular/core";
import { formatCurrency } from "@angular/common";

import {
  GridOptions,
  FilterChangedEvent,
  GridReadyEvent,
  GridApi,
  ColDef
} from "ag-grid-community";

@Component({
  selector: "sx-econa-balanza-items-table",
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
export class EcontaBalanzaItemsTableComponent implements OnInit, OnChanges {
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
    this.gridOptions.getRowStyle = this.buildRowStyle.bind(this);
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

  onModelUpdate(event) {
    this.actualizarTotales();
  }

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
      fileName: "balanza-sat.csv"
    };
    this.gridApi.exportDataAsCsv(params);
  }

  private buildColsDef(): ColDef[] {
    return [
      { headerName: "Cuenta", field: "cuenta", width: 170 },
      {
        headerName: "Saldo Inicial",
        field: "saldoInicial",
        width: 170,
        valueFormatter: params => this.transformCurrency(params.value)
      },
      {
        headerName: "debe",
        field: "debe",
        width: 170,
        valueFormatter: params => this.transformCurrency(params.value)
      },
      {
        headerName: "haber",
        field: "haber",
        width: 170,
        valueFormatter: params => this.transformCurrency(params.value)
      },
      {
        headerName: "Saldo Final",
        field: "saldoFinal",
        width: 170,
        valueFormatter: params => this.transformCurrency(params.value)
      }
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

  buildRowStyle(params: any) {
    if (params.node.rowPinned) {
      return {
        "font-weight": "bold",
        "background-color": "lightgray"
      };
    }
    if (params.data.status === "CERRADO") {
      return { "font-weight": "bold", "font-style": "italic", color: "green" };
    }
    if (params.data.autorizacionesRequeridas) {
      if (params.data.autorizacion) {
        return {
          "font-weight": "bold",
          "font-style": "italic",
          color: "rgb(25, 88, 131)"
        };
      } else {
        return {
          "font-weight": "bold",
          "font-style": "italic",
          color: "rgb(190, 119, 26)"
        };
      }
    }

    return {};
  }

  actualizarTotales() {
    if (this.gridApi) {
      let saldoInicial = 0.0;
      let debe = 0.0;
      let haber = 0.0;
      let saldoFinal = 0.0;
      this.gridApi.forEachNodeAfterFilterAndSort((rowNode, index) => {
        const sal = rowNode.data;
        saldoInicial += rowNode.data.saldoInicial;
        debe += rowNode.data.debe;
        haber += rowNode.data.haber;
        saldoFinal += rowNode.data.saldoFinal;
      });
      const cuenta = "Totales";
      const totales = { cuenta, saldoInicial, debe, haber, saldoFinal };
      this.gridApi.setPinnedBottomRowData([totales]);
    }
  }
}
