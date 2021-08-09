import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  Inject,
  LOCALE_ID,
  ChangeDetectorRef
} from '@angular/core';

import {
  GridOptions,
  GridApi,
  ColDef,
  GridReadyEvent,
  FilterChangedEvent,
  CellClickedEvent,
  RowDoubleClickedEvent,
  ColumnApi
} from 'ag-grid-community';
import { SxTableService } from './sx-table.service';
import { spAgGridText } from './table-support';
import { PrintCellRendererComponent } from './print-cell-renderer.component';

@Component({
  selector: 'sx-lx-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: 'NO UI REQUIRED'
})
export class LxTableComponent implements OnInit, OnChanges {
  @Input()
  partidas: any[] = [];
  @Output()
  select = new EventEmitter();

  public exportKey = 'EX';
  public debug = false;

  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public columnApi: ColumnApi;
  public defaultColDef: ColDef;

  public printFriendly = false;

  public localeText: any;

  public frameworkComponents;

  constructor(public tableService: SxTableService) {
    this.buildGridOptions();
    this.buildLocalText();
    this.frameworkComponents = {
      printRenderer: PrintCellRendererComponent
    };
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.partidas && changes.partidas.currentValue) {
      if (this.gridApi) {
        this.setRowData(changes.partidas.currentValue);
      }
    }
  }

  setRowData(data: any[]) {
    if (this.debug) {
      console.log('Partidas', data);
    }
    this.gridApi.setRowData(data);
  }

  buildGridOptions() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.buildColsDef();
    this.defaultColDef = {
      editable: false,
      filter: 'agTextColumnFilter'
    };
    this.gridOptions.onFilterChanged = this.onFilter.bind(this);
    this.gridOptions.onCellClicked = this.onCellClicked.bind(this);
    this.gridOptions.onRowDoubleClicked = this.onRowDoubleClicked.bind(this);
    this.gridOptions.getRowStyle = this.buildRowStyle.bind(this);
    this.gridOptions.onFirstDataRendered = this.onFirstDataRendered.bind(this);
    this.gridOptions.onGridReady = this.onGridReady.bind(this);
  }

  onModelUpdate(event) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.setRowData(this.partidas);
  }

  buildRowStyle(params: any) {
    /*
    if (params.data.pagada) {
      return {
        color: 'rgb(231, 61, 61)'
      };
    } else {
      return '';
    }
    */
    return {};
  }

  onFirstDataRendered(params) {}

  onFilter(event: FilterChangedEvent) {}

  onCellClicked(event: CellClickedEvent) {}

  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    this.select.emit(event.data);
  }

  exportData(prefix: string = this.exportKey) {
    const params = {
      fileName: `${prefix}_${new Date().getTime()}.csv`
    };
    this.gridApi.exportDataAsCsv(params);
  }

  buildLocalText() {
    this.localeText = spAgGridText;
  }

  transformCurrency(data) {
    return this.tableService.formatCurrency(data);
  }

  transformNumber(data, info = null) {
    return this.tableService.formatNumber(data, info);
  }

  transformDate(data, format: string = 'dd/MM/yyyy') {
    return this.tableService.formatDate(data, format);
  }

  transformPercent(data, format = null) {
    return this.tableService.formatPercent(data, format);
  }

  buildColsDef(): ColDef[] {
    return [];
  }
}
