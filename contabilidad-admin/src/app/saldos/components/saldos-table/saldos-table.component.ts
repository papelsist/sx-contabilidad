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
} from '@angular/core';
import { formatDate, formatCurrency } from '@angular/common';

import { SaldoPorCuentaContable } from '../../models';
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
} from 'ag-grid-community';

@Component({
  selector: 'sx-saldos-table',
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
        [rowSelection]="selectionType"
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
export class SaldosTableComponent implements OnInit, OnChanges {
  @Input()
  saldos: SaldoPorCuentaContable[] = [];

  @Input()
  filter: string;

  @Input()
  selected: number;

  gridOptions: GridOptions;
  gridApi: GridApi;
  defaultColDef;

  @Output()
  drillData = new EventEmitter<SaldoPorCuentaContable>();

  @Output()
  selectionChange = new EventEmitter<any[]>();

  @Output()
  totalesChanged = new EventEmitter<{
    saldoInicial: number;
    debe: number;
    haber: number;
    saldoFinal: number;
  }>();

  @Input()
  selectionType = 'single';

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
      filter: 'agTextColumnFilter'
    };

    this.gridOptions.onFilterChanged = this.onFilter;

    this.gridOptions.onRowDoubleClicked = (event: RowDoubleClickedEvent) => {
      this.drillData.emit(event.data);
      // console.log('Double click: ', event);
    };
    this.gridOptions.onCellClicked = (event: CellClickedEvent) => {
      if (event.colDef.field === 'clave') {
        // this.selectionChange.emit([event.data]);
        // console.log('Cell clicked: ', event.colDef.field);
        // const selectedRows = this.gridApi.getSelectedRows();
        // this.selectionChange.emit(selectedRows);
      }
    };
    this.gridOptions.onCellDoubleClicked = (event: CellDoubleClickedEvent) => {
      if (event.colDef.field === 'descripcion') {
        this.drillData.emit(event.data);
      }
    };
    this.buildLocalText();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.saldos && changes.saldos.currentValue) {
      // this.gridOptions.rowData = changes.saldos.currentValue;
      if (this.gridApi) {
        this.gridApi.setRowData(changes.saldos.currentValue);
        this.actualizarTotales();
      }
    }
  }

  onModelUpdate(event) {
    this.actualizarTotales();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.saldos);
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onFilter(event: FilterChangedEvent) {}

  actualizarTotales() {
    if (this.gridApi) {
      let saldoInicial = 0.0;
      let debe = 0.0;
      let haber = 0.0;
      let saldoFinal = 0.0;
      this.gridApi.forEachNodeAfterFilterAndSort((rowNode, index) => {
        const sal = rowNode.data;
        console.log('Evaluando: ', sal);
        if (sal.nivel === 1) {
          saldoInicial += rowNode.data.saldoInicial;
          debe += rowNode.data.debe;
          haber += rowNode.data.haber;
          saldoFinal += rowNode.data.saldoFinal;
        }
        /*
          saldoInicial += rowNode.data.saldoInicial;
          debe += rowNode.data.debe;
          haber += rowNode.data.haber;
          saldoFinal += rowNode.data.saldoFinal;
        */
      });
      const totales = { saldoInicial, debe, haber, saldoFinal };
      this.totalesChanged.emit(totales);
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
      fileName: 'saldos.csv'
    };
    this.gridApi.exportDataAsCsv(params);
  }

  private buildColsDef(): ColDef[] {
    return [
      {
        headerName: 'Cuenta',
        field: 'clave',
        width: 170,
        pinned: 'left'
      },
      {
        headerName: 'Descripción de la cuenta',
        field: 'descripcion',
        width: 300,
        pinned: 'left'
      },
      {
        headerName: 'N',
        field: 'nivel',
        filter: 'agNumberColumnFilter',
        width: 60
      },
      {
        headerName: 'Ejercicio',
        field: 'ejercicio',
        width: 90
      },
      {
        headerName: 'Mes',
        field: 'mes',
        width: 90
      },
      {
        headerName: 'S. Inicial',
        field: 'saldoInicial',
        filter: 'agNumberColumnFilter',
        cellRenderer: params => this.transformCurrency(params.value),
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
        headerName: 'S. Final',
        field: 'saldoFinal',
        filter: 'agNumberColumnFilter',
        cellRenderer: params => this.transformCurrency(params.value),
        width: 150
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

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectionChange.emit(selectedRows);
  }
}
