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
import * as moment from 'moment';

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
import { SatMetadata } from 'app/auditoria/models';

@Component({
  selector: 'sx-metadata-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="height: 100%">
      <ag-grid-angular
        #agGrid
        class="ag-theme-balham"
        style="width: 100%; height: 600px;"
        [rowData]="data"
        [gridOptions]="gridOptions"
        [defaultColDef]="defaultColDef"
        [floatingFilter]="true"
        [enableSorting]="true"
        [enableColResize]="true"
        [animateRows]="true"
        [localeText]="localeText"
        (gridReady)="onGridReady($event)"
        (modelUpdated)="onModelUpdate($event)"
        (gridReady)="actualizarTotales()"
      >
      </ag-grid-angular>
    </div>
  `,
  styles: [``]
})
export class MetadataTableComponent implements OnInit, OnChanges {
  @Input()
  data: SatMetadata[] = [];

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

  ngOnChanges(changes: SimpleChanges) {}

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
      width: 150
    };
    this.localeText = spAgGridText;
    this.gridOptions.getRowStyle = params => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      } else if (params.data.fechaCancelacion) {
        return { color: 'red', 'font-style': 'italic' };
      }
      return {};
    };
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

  onModelUpdate(event: ModelUpdatedEvent) {
    if (this.gridApi) {
      this.actualizarTotales();
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
      const row: SatMetadata = rowNode.data;
      registros++;
    });
    const res = [
      {
        emisorNombre: `Registros: ${registros}`
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
        headerName: 'Ej',
        field: 'ejercicio',
        width: 90,
        pinned: 'left'
      },
      {
        headerName: 'Ms',
        field: 'mes',
        width: 80,
        pinned: 'left',
        pinnedRowCellRenderer: r => r.value
      },
      {
        headerName: 'Receptor',
        field: 'recepctorNombre',
        width: 200
      },
      {
        headerName: 'Receptor RFC',
        field: 'receptorRfc',
        width: 120
      },
      {
        headerName: 'Emisor',
        field: 'emisorNombre',
        width: 200
      },
      {
        headerName: 'Emisor RFC',
        field: 'emisorRfc',
        width: 120
      },
      {
        headerName: 'Fecha',
        field: 'fechaEmision',
        width: 110,
        valueFormatter: params => this.tableService.formatDate(params.value)
      },
      {
        headerName: 'Monto',
        field: 'monto',
        width: 120,
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Tpo',
        field: 'efectoComprobante',
        width: 80
      },
      {
        headerName: 'E',
        field: 'estatus',
        width: 80,
        valueFormatter: params => (params.value === '1' ? 'V' : 'C')
      },
      {
        headerName: 'F. Canclacion',
        field: 'fechaCancelacion',
        width: 110,
        valueFormatter: params => this.tableService.formatDate(params.value)
      }
    ];
  }
}
