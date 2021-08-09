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
import { AuditoriaFiscalCfdi } from 'app/auditoria/models';

@Component({
  selector: 'sx-auditoria-cfdi-table',
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
export class AuditoriaCfdiTableComponent implements OnInit, OnChanges {
  @Input()
  data: AuditoriaFiscalCfdi[] = [];

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
      } else if (params.data.diferencia > 0) {
        return {
          color: 'rgb(201, 152, 16, 0.856)',
          'font-style': 'italic',
          'font-weight': 'bold'
        };
      } else if (params.data.diferencia < 0) {
        return { color: 'red', 'font-style': 'italic', 'font-weight': 'bold' };
      }
      return {};
    };
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  exportData() {
    const params = {
      fileName: `AUDF_${new Date().getTime()}.csv`
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
    // let registros = 0;
    // this.gridApi.forEachNodeAfterFilter((rowNode, index) => {
    //   const row: AuditoriaFiscalCfdi = rowNode.data;
    //   registros++;
    // });
    // const res = [
    //   {
    //     emisorNombre: `Registros: ${registros}`
    //   }
    // ];
    // this.gridApi.setPinnedBottomRowData(res);
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
        pinned: 'left'
      },
      {
        headerName: 'Tipo',
        field: 'tipo',
        width: 110
      },
      {
        headerName: 'Estatus',
        field: 'estatus',
        width: 110,
      },
      {
        headerName: 'Registros SAT',
        field: 'registrosSat',
        width: 150
      },
      {
        headerName: 'Registros SX',
        field: 'registrosSx',
        width: 150
      },
      {
        headerName: 'Diff',
        field: 'diferencia',
        width: 120
      },
      {
        headerName: 'Resultado',
        colId: 'resultado',
        width: 400,
        valueGetter: params => {
          const dif = params.data.diferencia;
          if (dif > 0) {
            return `PRECAUCION EL SAT TIENE ${dif} registros que no existen en SIIPAP Rx`;
          } else if (dif < 0) {
            return `PELIGRO EL SAT NO TIENE ${Math.abs(dif)} registros que existen en SIIPAP Rx`;
          } else {
            return 'OK ';
          }
        }
      }
    ];
  }
}
