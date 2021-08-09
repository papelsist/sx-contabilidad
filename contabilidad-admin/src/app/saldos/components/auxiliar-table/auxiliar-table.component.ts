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
  ColDef,
  CsvExportParams,
  ProcessCellForExportParams
} from 'ag-grid-community';

import { Auxiliar } from 'app/saldos/models/auxiliar';

@Component({
  selector: 'sx-auxiliar-table',
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
        [floatingFilter]="true"
        [enableColResize]="true"
        [animateRows]="true"
        [localeText]="localeText"
        (firstDataRendered)="onFirstDataRendered($event)"
        (gridReady)="onGridReady($event)"
        (modelUpdated)="onModelUpdate($event)">
      </ag-grid-angular>
    </div>
  `,
  styles: [
    `
      .myGrid {
        width: 100%;
        height: 700px;
      }
    `
  ]
})
export class AuxiliarTableComponent implements OnInit, OnChanges {
  @Input()
  partidas: Auxiliar[] = [];

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
      filter: 'agTextColumnFilter'
      // width: '100px'
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
    params.api.sizeColumnsToFit();
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
    const params: CsvExportParams = {
      fileName: `AUX_${new Date().getTime()}.csv`,
      processCellCallback: (pm: ProcessCellForExportParams) => {
        if (pm.column.getId() === 'fecha') {
          return this.transformDate(pm.value);
        }
        return pm.value;
      }
    };

    this.gridApi.exportDataAsCsv(params);
  }

  private buildColsDef() {
    const data: ColDef[] = [
      {
        headerName: 'T',
        field: 'tipo',
        cellRenderer: params => params.value.substring(0, 1),
        width: 60,
        pinned: 'left'
      },
      {
        headerName: 'Poliza',
        field: 'poliza',
        width: 100,
        pinned: 'left'
      },
      {
        headerName: 'Fecha',
        field: 'fecha',
        cellRenderer: params => this.transformDate(params.value),
        width: 120,
        pinned: 'left'
      },
      {
        headerName: 'Cuenta',
        field: 'clave',
        pinned: 'left'
      },
      {
        headerName: 'Cuenta (Desc)',
        field: 'ctaDescripcion',
        pinned: 'left'
      },
      {
        headerName: 'Descripción',
        field: 'descripcion',
        minWidth: 250
      },
      {
        headerName: 'Debe',
        field: 'debe',
        filter: 'agNumberColumnFilter',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Haber',
        field: 'haber',
        filter: 'agNumberColumnFilter',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Sucursal',
        field: 'sucursal',
        maxWidth: 130
      },
      {
        headerName: 'Asiento',
        field: 'asiento',
        maxWidth: 130
      },
      {
        headerName: 'Subtipo',
        field: 'subtipo',
        width: 150
      }
    ];
    return data;
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
  transformDate(data) {
    return formatDate(data, 'dd/MM/yyyy', this.locale);
  }
}
