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
  ModelUpdatedEvent,
  ColDef,
  GridOptions,
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';

import { SxTableService } from 'app/_shared/components/lx-table/sx-table.service';
import { spAgGridText } from 'app/_shared/components/lx-table/table-support';
import { AjusteConcepto } from '../../model';

@Component({
  selector: 'sx-conceptos-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="height: 500px">
      <ag-grid-angular
        #agGrid
        class="ag-theme-balham"
        style="width: 100%; height: 100%;"
        [rowData]="rows"
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
export class ConceptosTableComponent implements OnInit, OnChanges {
  @Input()
  rows: any[] = [];

  @Output()
  selectionChange = new EventEmitter<AjusteConcepto>();

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
        headerName: 'Concepto',
        field: 'concepto',
        width: 200,
        pinned: 'left'
      },
      {
        headerName: 'Tipo',
        field: 'tipo',
        width: 120
      },
      {
        headerName: 'Grupo',
        field: 'grupo',
        width: 120
      },
      {
        headerName: 'Cta',
        field: 'clave',
        width: 150
      },
      {
        headerName: 'Activo',
        field: 'activo',
        width: 100
      }
    ];
  }
}
