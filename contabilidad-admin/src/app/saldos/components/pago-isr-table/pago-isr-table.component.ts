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
import { formatCurrency, formatNumber } from '@angular/common';

import {
  GridOptions,
  FilterChangedEvent,
  GridReadyEvent,
  GridApi,
  ColDef
} from 'ag-grid-community';

import { PagoIsr } from 'app/saldos/models';

@Component({
  selector: 'sx-pago-isr-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ag-grid-angular #agGrid
    class="ag-theme-balham"
    style="width: 100%; height: 100%;"
    [gridOptions]="gridOptions"
    [defaultColDef]="defaultColDef"
    [enableFilter]="false"
    [enableSorting]="false"
    [floatingFilter]="false"
    [enableColResize]="true"
    [localeText]="localeText"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
    (modelUpdated)="onModelUpdate($event)">
  </ag-grid-angular>
  `,
  styleUrls: ['./pago-isr-table.component.scss']
})
export class PagoIsrTableComponent implements OnInit, OnChanges {
  @Input()
  partidas: PagoIsr[] = [];

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

    this.gridOptions.getRowClass = function(params) {
      if (params.data.clave.includes('FORMULA')) {
        return 'formula-row';
      }
    };
    this.gridOptions.getRowStyle = function(params) {
      if (params.data.clave.includes('FORMULA')) {
        return {
          'background-color': 'rgb(231, 236, 241, 0.932)',
          'font-style': 'italic',
          'font-weight': 'bold'
        };
      }
    };
    /*
    this.gridOptions.rowClassRules = {
      // apply green to 2008
      'formula-row': function(params) {
        return params.data.clave === 'FORMULA_02';
      }
    };
    */

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

  onModelUpdate(event) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.partidas);
  }

  onFirstDataRendered(params) {}

  onFilter(event: FilterChangedEvent) {}

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
      fileName: `PAGO_ISR_${new Date().getTime()}.csv`
    };
    this.gridApi.exportDataAsCsv(params);
  }

  private buildColsDef(): ColDef[] {
    return [
      {
        headerName: 'Rg',
        field: 'renglon',
        width: 60,
        pinned: 'left'
      },
      {
        headerName: 'Concepto',
        field: 'concepto',
        width: 350,
        pinned: 'left'
      },
      {
        headerName: 'Enero',
        field: 'enero',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Febrero',
        field: 'febrero',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Marzo',
        field: 'marzo',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Abril',
        field: 'abril',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Mayo',
        field: 'mayo',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Junio',
        field: 'junio',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Julio',
        field: 'julio',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Agosto',
        field: 'agosto',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Septiembre',
        field: 'septiembre',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Octubre',
        field: 'octubre',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Noviembre',
        field: 'noviembre',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Diciembre',
        field: 'diciembre',
        pinned: 'right',
        cellRenderer: params => this.transformCurrency(params.value)
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
    // return formatCurrency(data, this.locale, '$');
    return formatNumber(data, this.locale, '');
  }
}
