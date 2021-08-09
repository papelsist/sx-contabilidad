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
import { formatCurrency, formatDate } from '@angular/common';

import {
  GridOptions,
  FilterChangedEvent,
  GridReadyEvent,
  GridApi
} from 'ag-grid-community';

import { PolizaDet } from 'app/polizas/models';

@Component({
  selector: 'sx-movimientos-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style='height: 100%'>
      <ag-grid-angular #agGrid
        class="ag-theme-balham"
        [ngClass]="{myGrid: !printFriendly, print: printFriendly}"
        [gridOptions]="gridOptions"
        [defaultColDef]="defaultColDef"
        [enableFilter]="enableFilter"
        [enableSorting]="enableSorting"
        [floatingFilter]="true"
        [enableColResize]="true"
        [animateRows]="true"
        [localeText]="localeText"
        (firstDataRendered)="onFirstDataRendered($event)"
        (gridReady)="onGridReady($event)"
        (modelUpdated)="onModelUpdate($event)"
        [rowSelection]="selectionType"
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
export class MovimientosTableComponent implements OnInit, OnChanges {
  @Input()
  partidas: PolizaDet[] = [];

  @Input()
  filter: string;

  @Input()
  enableFilter = true;

  @Input()
  enableSorting = true;

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

  @Input()
  selectionType = 'multiple';
  @Output()
  selectionChange = new EventEmitter<any[]>();

  constructor(
    private cd: ChangeDetectorRef,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.buildColsDef();
    this.defaultColDef = {
      width: 110,
      editable: false,
      filter: 'agTextColumnFilter'
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
    const params = {
      fileName: `AUX_${new Date().getTime()}.csv`
    };
    this.gridApi.exportDataAsCsv(params);
  }

  private buildColsDef() {
    return [
      {
        headerName: 'Pza',
        field: 'folio',
        width: 90
      },
      {
        headerName: 'Subtipo',
        field: 'subtipo',
        width: 100
      },
      {
        headerName: 'Fecha',
        field: 'fecha',
        width: 110,
        cellRenderer: params => this.transformDate(params.value)
      },
      {
        headerName: 'Cuenta',
        field: 'clave',
        width: 150
      },
      {
        headerName: 'Desc',
        field: 'descripcion',
        width: 250
      },
      {
        headerName: 'Asiento',
        field: 'asiento',
        width: 150
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
        columnGroupShow: 'open',
        maxWidth: 120
      },
      { headerName: 'Ref', field: 'referencia', maxWidth: 120 },
      { headerName: 'Ref2', field: 'referencia2', maxWidth: 120 },
      { headerName: 'Docto', field: 'documento', maxWidth: 120 }
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
  transformDate(data) {
    return formatDate(data, 'dd/MM/yyyy', this.locale);
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectionChange.emit(selectedRows);
  }
}
