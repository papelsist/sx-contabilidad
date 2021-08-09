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
import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';
import { spAgGridText } from 'app/_shared/components/lx-table/table-support';

@Component({
  selector: 'sx-depreciaciones-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="height: 350px">
      <ag-grid-angular
        #agGrid
        class="ag-theme-balham"
        style="width: 100%; height: 100%;"
        [rowData]="depreciaciones"
        [gridOptions]="gridOptions"
        [defaultColDef]="defaultColDef"
        [floatingFilter]="false"
        [localeText]="localeText"
        (gridReady)="onGridReady($event)"
        (modelUpdated)="onModelUpdate($event)"
      >
      </ag-grid-angular>
    </div>
  `,
  styles: [``]
})
export class DepreciacionesTableComponent implements OnInit, OnChanges {
  @Input()
  depreciaciones: any[] = [];

  @Output()
  selectionChange = new EventEmitter<any[]>();

  @Output()
  select = new EventEmitter<any[]>();

  gridOptions: GridOptions;

  gridApi: GridApi;

  localeText: any;

  defaultColDef: ColDef;

  constructor(public tableService: SxTableService) {
    this.buildGridOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.depreciaciones.currentValue) {
      // this.gridApi.setRowData(changes.depreciaciones.currentValue);
    }
  }

  ngOnInit() {}

  buildGridOptions() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.buildColsDef();
    this.gridOptions.rowSelection = 'multiple';
    this.gridOptions.rowMultiSelectWithClick = true;
    this.gridOptions.onRowSelected = (event: RowSelectedEvent) => {
      this.selectionChange.emit(this.gridApi.getSelectedRows());
    };
    this.gridOptions.onRowDoubleClicked = params => {
      this.select.emit(params.data);
    };
    this.defaultColDef = {
      editable: false,
      filter: 'agTextColumnFilter',
      width: 170,
      pinnedRowValueFormatter: params => ''
    };
    this.localeText = spAgGridText;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  exportData() {
    const params = {
      fileName: `AF_${new Date().getTime()}.csv`
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
      this.actualizarTotales();
      // this.gridApi.sizeColumnsToFit();
    }
  }

  getAllRows() {
    const data = [];
    if (this.gridApi) {
      this.gridApi.forEachNode((rowNode, index) => {
        const det = rowNode.data;
        data.push(det);
      });
    }
    return data;
  }

  actualizarTotales() {
    let registros = 0;
    this.gridApi.forEachNodeAfterFilter((rowNode, index) => {
      const row = rowNode.data;
      registros++;
    });
    const res = [
      {
        ejercicio: `Registros:`,
        mes: ` ${registros}`
      }
    ];
    this.gridApi.setPinnedBottomRowData(res);
  }

  clearSelection() {
    this.gridApi.deselectAll();
  }

  buildColsDef(): ColDef[] {
    return [
      {
        headerName: 'Ejercicio',
        field: 'ejercicio',
        width: 100,
        pinnedRowValueFormatter: params => params.value
      },
      {
        headerName: 'Mes',
        field: 'mes',
        width: 80,
        pinnedRowValueFormatter: params => params.value
      },
      {
        headerName: 'Tasa',
        field: 'tasaDepreciacion',
        valueFormatter: params =>
          this.tableService.formatPercent(params.value / 100)
      },
      {
        headerName: 'Acumulada',
        field: 'depreciacionAcumulada',
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Depreciación',
        field: 'depreciacion',
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Remanente',
        field: 'remanente',
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Corte',
        field: 'corte',
        valueFormatter: params => this.tableService.formatDate(params.value)
      },
      {
        headerName: 'Usuario',
        field: 'createUser'
      }
    ];
  }
}
