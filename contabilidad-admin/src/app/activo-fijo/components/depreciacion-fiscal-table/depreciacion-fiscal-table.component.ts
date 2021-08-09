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
import { DepreciacionFiscal } from 'app/activo-fijo/models/depreciacion-fiscal';

@Component({
  selector: 'sx-depreciacione-fiscal-table',
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
export class DepreciacioneFiscalTableComponent implements OnInit, OnChanges {
  @Input()
  depreciaciones: DepreciacionFiscal[] = [];

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

  clearSelection() {
    this.gridApi.deselectAll();
  }

  buildColsDef(): ColDef[] {
    return [
      {
        headerName: 'Ejercicio',
        field: 'ejercicio',
        width: 100
      },
      {
        headerName: 'INPC PM',
        field: 'inpcPrimeraMitad',
        valueFormatter: params =>
          this.tableService.formatNumber(params.value, '1.1-4')
      },
      {
        headerName: 'INPC Mes',
        field: 'inpcDelMesAdquisicion',
        valueFormatter: params =>
          this.tableService.formatNumber(params.value, '1.1-4')
      },
      {
        headerName: 'Fac de Act',
        field: 'factorDeActualizacion',
        valueFormatter: params =>
          this.tableService.formatNumber(params.value, '1.1-4')
      },
      {
        headerName: 'Dep Ejercicio Ant',
        field: 'depreciacionEjercicioAnterior',
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Dep Ejercicio',
        field: 'depreciacionDelEjercicio',
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Dep acumulada',
        field: 'depreciacionAcumulada',
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Depreciación Fiscal',
        field: 'depreciacionFiscal',
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Creado',
        field: 'dateCreated',
        valueFormatter: params => this.tableService.formatDate(params.value)
      },
      {
        headerName: 'Usuario',
        field: 'createUser'
      }
    ];
  }
}
