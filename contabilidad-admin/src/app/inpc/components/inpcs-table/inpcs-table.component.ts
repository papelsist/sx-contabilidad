import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import * as _ from 'lodash';

import {
  RowSelectedEvent,
  ModelUpdatedEvent,
  ColDef,
  CellDoubleClickedEvent,
  GridOptions,
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';

import { SxTableService } from 'app/_shared/components/lx-table/sx-table.service';

import { spAgGridText } from 'app/_shared/components/lx-table/table-support';
import { Inpc } from '../../models/inpc';

@Component({
  selector: 'sx-inpcs-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="height: 350px">
      <ag-grid-angular
        #agGrid
        class="ag-theme-balham"
        style="width: 100%; height: 100%;"
        [rowData]="inpcs"
        [gridOptions]="gridOptions"
        [defaultColDef]="defaultColDef"
        [floatingFilter]="true"
        [localeText]="localeText"
        (gridReady)="onGridReady($event)"
        (modelUpdated)="onModelUpdate($event)"
      >
      </ag-grid-angular>
    </div>
  `,
  styles: [``]
})
export class InpcsTableComponent implements OnInit, OnChanges {
  @Input()
  inpcs: any[] = [];

  @Output()
  selectionChange = new EventEmitter<Inpc>();

  @Output()
  select = new EventEmitter<any[]>();

  @Output()
  delete = new EventEmitter();

  gridOptions: GridOptions;

  gridApi: GridApi;

  localeText: any;

  defaultColDef: ColDef;

  constructor(public tableService: SxTableService) {
    this.buildGridOptions();
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {}

  buildGridOptions() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.buildColsDef();
    this.gridOptions.rowSelection = 'single';
    this.gridOptions.rowMultiSelectWithClick = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.enableColResize = true;
    this.gridOptions.onRowDoubleClicked = params => {
      this.select.emit(params.data);
    };
    this.gridOptions.onCellClicked = params => {
      if (params.column.getColId() === 'delete') {
        this.delete.emit(params.data);
      }
    };
    this.defaultColDef = {
      editable: false,
      filter: 'agTextColumnFilter',
      width: 130,
      pinnedRowValueFormatter: params => ''
    };
    this.localeText = spAgGridText;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  exportData() {
    const params = {
      fileName: `INPC_${new Date().getTime()}.csv`
    };
    this.gridApi.exportDataAsCsv(params);
  }

  buildRowStyle(params: any) {
    if (params.node.rowPinned) {
      return { 'font-weight': 'bold' };
    }
    return {};
  }

  onModelUpdate(event: ModelUpdatedEvent) {
    if (this.gridApi) {
    }
  }

  buildColsDef(): ColDef[] {
    return [
      {
        headerName: 'Ejercicio',
        field: 'ejercicio',
        width: 150
      },
      {
        headerName: 'Mes',
        field: 'mes',
        width: 150
      },
      {
        headerName: 'Tasa',
        field: 'tasa',
        width: 150
      },
      {
        headerName: 'D',
        colId: 'delete',
        valueGetter: params => 'D',
        width: 80
      }
    ];
  }
}
