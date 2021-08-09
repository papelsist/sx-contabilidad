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
} from '@angular/core';
import { formatDate, formatCurrency } from '@angular/common';

import {
  GridOptions,
  FilterChangedEvent,
  GridReadyEvent,
  GridApi,
  ColDef
} from 'ag-grid-community';

import { Diot } from 'app/saldos/models';

@Component({
  selector: 'sx-diot-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ag-grid-angular #agGrid
    class="ag-theme-balham"
    style="width: 100%; height: 100%;"
    [gridOptions]="gridOptions"
    [defaultColDef]="defaultColDef"
    [enableFilter]="true"
    [enableSorting]="true"
    [floatingFilter]="true"
    [enableColResize]="true"
    [localeText]="localeText"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
    (modelUpdated)="onModelUpdate($event)">
  </ag-grid-angular>
  `,
  styles: []
})
export class DiotTableComponent implements OnInit, OnChanges {
  @Input()
  partidas: Diot[] = [];

  @Input()
  filter: string;

  @Input()
  selected: number;

  gridOptions: GridOptions;
  gridApi: GridApi;
  defaultColDef;

  @Output()
  select = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  @Output()
  totalesChanged = new EventEmitter<{ debe: number; haber: number }>();

  printFriendly = false;

  localeText;

  pinnedBottomRowData;
  frameworkComponents;

  constructor(
    private cd: ChangeDetectorRef,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.buildColsDef();
    this.defaultColDef = {
      editable: false,
      filter: 'agTextColumnFilter',
      width: 150
    };
    this.gridOptions.onFilterChanged = this.onFilter;
    this.buildLocalText();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.partidas && changes.partidas.currentValue) {
      if (this.gridApi) {
        this.gridApi.setRowData(changes.partidas.currentValue);
      }
    }
  }

  onModelUpdate(event) {
    this.actualizarTotales();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.partidas);
  }

  onFirstDataRendered(params) {
    // params.api.sizeColumnsToFit();
  }

  onFilter(event: FilterChangedEvent) {}

  actualizarTotales() {
    if (this.gridApi) {
      let debe = 0.0;
      let haber = 0.0;
      this.gridApi.forEachNodeAfterFilter((rowNode, index) => {
        debe += rowNode.data.debe;
        haber += rowNode.data.haber;
      });
      this.totalesChanged.emit({ debe, haber });
    }
  }

  printGrid() {
    this.gridApi.setDomLayout('print');
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
      fileName: `DIOT_${new Date().getTime()}.csv`
    };
    this.gridApi.exportDataAsCsv(params);
  }

  private buildColsDef(): ColDef[] {
    return [
      {
        headerName: 'Proveedor',
        field: 'proveedor',
        tooltip: params => params.colDef.colId
      },
      {
        headerName: 'RFC',
        field: 'rfc'
      },
      {
        headerName: 'Id',
        field: 'idFiscal'
      },
      {
        headerName: 'Nom Ext',
        field: 'nombreExtranjero'
      },
      {
        headerName: 'P. Residencia',
        field: 'paisResidencia'
      },
      {
        headerName: 'Nacionalidad',
        field: 'nacionalidad'
      },
      {
        headerName: 'P 1516',
        field: 'pagos1516',
        cellRenderer: params => this.transformCurrency(params.value),
        tooltip: params => params.colDef.colId
      },
      {
        headerName: 'P 15',
        field: 'pagos15',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'IVA Pagad 1516',
        field: 'ivaPagado1516',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Pagos 1011',
        field: 'pagos1011',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Pagos 10',
        field: 'pagos10',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Pagos Front',
        field: 'pagosFrontera',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'IVA P1011',
        field: 'ivaPagado1011',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'IVA PFRON',
        field: 'ivaPagadoFrontera',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'PImportacion',
        field: 'pagosImportacion',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'IVA P IMP1516',
        field: 'ivaPagadoImportacion1516',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'PIMP1011',
        field: 'pagosImportacion1011',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'IVAPIMP1011',
        field: 'ivaPagadoImportacion1011',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'PIMPSinIVA',
        field: 'pagosImportacionSinIva',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'PTasa0',
        field: 'pagosTasa0',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'PSinIVA',
        field: 'pagosSinIva',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'IVA RET CONT',
        field: 'ivaRetenidoContribuyente',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'ivaNotas',
        field: 'IVA Notas',
        cellRenderer: params => {
          if (!params.value) {
            return this.transformCurrency(params.value);
          } else {
            return this.transformCurrency(0.0);
          }
        }
      },
      {
        headerName: 'IVA Acre',
        field: 'ivaAcreditable',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'IVA Ant',
        field: 'ivaAnticipo',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'T Tercero',
        field: 'tipoTercero'
      },
      {
        headerName: 'T Oper',
        field: 'tipoOperacion'
      }
    ];
  }

  buildLocalText() {
    this.localeText = {
      page: 'página',
      more: 'mas',
      to: 'a',
      of: 'de',
      next: 'siguiente',
      last: 'ultimo',
      first: 'primero',
      previous: 'anterior',
      loadingOoo: 'cargando...',
      applyFilter: 'Aplicar...',
      equals: 'igual',
      notEqual: 'diferente a',
      lessThan: 'menor que',
      greaterThan: 'mayor que',
      lessThanOrEqual: 'menor o igual',
      greaterThanOrEqual: 'mayor o igual',
      inRange: 'rango',
      contains: 'contiene',
      notContains: 'no contiene',
      startsWith: 'inicia con',
      endsWith: 'termina con',
      filters: 'filtros'
    };
  }

  transformCurrency(data) {
    return formatCurrency(data, this.locale, '$');
  }
}
