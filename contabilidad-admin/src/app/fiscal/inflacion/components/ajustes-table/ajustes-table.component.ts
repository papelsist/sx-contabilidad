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
import { AjusteAnual } from '../../model';

@Component({
  selector: 'sx-ajustes-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ag-grid-angular
      #agGrid
      class="ag-theme-balham"
      style="width: 100%; height: 600px;"
      [rowData]="rows"
      [gridOptions]="gridOptions"
      [defaultColDef]="defaultColDef"
      [floatingFilter]="false"
      [enableFilter]="true"
      [enableSorting]="true"
      [enableColResize]="true"
      [localeText]="localeText"
      (gridReady)="onGridReady($event)"
      (modelUpdated)="onModelUpdate($event)"
      [animateRows]="true"
    >
    </ag-grid-angular>
  `,
  styles: [``]
})
export class AjustesTableComponent implements OnInit, OnChanges {
  @Input()
  rows: any[] = [];

  @Output()
  selectionChange = new EventEmitter<AjusteAnual>();

  @Output()
  select = new EventEmitter<any[]>();

  gridOptions: GridOptions;

  gridApi: GridApi;

  localeText: any;

  defaultColDef: ColDef;

  totalRow = { enero: 0, febrero: 0 };

  constructor(public tableService: SxTableService) {
    this.buildGridOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rows.currentValue) {
    }
  }

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
    this.gridOptions.onCellClicked = params => {};
    this.defaultColDef = {
      editable: false,
      filter: 'agTextColumnFilter',
      width: 130
      // pinnedRowValueFormatter: params => ''
    };
    this.localeText = spAgGridText;
    this.gridOptions.getRowStyle = this.buildRowStyle.bind(this);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.actualizarTotales();
  }

  exportData() {
    const params = {
      fileName: `AJUSTE_ANUAL_INFLACION_${new Date().getTime()}.csv`
    };
    this.gridApi.exportDataAsCsv(params);
  }

  buildRowStyle(params: any) {
    if (params.node.rowPinned) {
      return { 'font-weight': 'bold' };
    } else if (params.data.concepto.concepto === 'SUMA') {
      return {
        'font-weight': 'bold',
        'font-style': 'italic',
        background: 'rgb(233, 221, 221)'
        // background: 'background: rgb(233, 221, 221)'
      };
    }
    return {};
  }

  onModelUpdate(event: ModelUpdatedEvent) {
    if (this.gridApi) {
      this.actualizarTotales();
    }
  }

  actualizarTotales() {
    let enero = 0;
    let febrero = 0;
    let marzo = 0;
    let abril = 0;
    let mayo = 0;
    let junio = 0;
    let julio = 0;
    let agosto = 0;
    let septiembre = 0;
    let octubre = 0;
    let noviembre = 0;
    let diciembre = 0;

    this.gridApi.forEachNodeAfterFilter((rowNode, index) => {
      const row: AjusteAnual = rowNode.data;
      if (row.concepto.concepto !== 'SUMA') {
        enero += row.enero;
        febrero += row.febrero;
        marzo += row.marzo;
        abril += row.abril;
        mayo += row.mayo;
        junio += row.junio;
        julio += row.julio;
        agosto += row.agosto;
        septiembre += row.septiembre;
        octubre += row.octubre;
        noviembre += row.noviembre;
        diciembre += row.diciembre;
      }
    });
    const res = [
      {
        enero,
        febrero,
        marzo,
        abril,
        mayo,
        junio,
        julio,
        agosto,
        septiembre,
        octubre,
        noviembre,
        diciembre
      }
    ];
    this.gridApi.setPinnedBottomRowData(res);
  }

  buildColsDef(): ColDef[] {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];
    const mesesDef: ColDef[] = meses.map(item => {
      return {
        headerName: item,
        field: item.toLowerCase(),
        width: 140,
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      };
    });
    return [
      {
        headerName: 'Concepto',
        field: 'concepto',
        width: 300,
        valueGetter: params => {
          if (!params.node.isRowPinned()) {
            const aju = params.data;
            if (aju.concepto.concepto === 'SUMA') {
              const cc = aju.concepto;
              return `${cc.concepto} (${aju.concepto.grupo})`;
            } else {
              return aju.concepto.concepto;
            }
          }
        },
        pinned: 'left'
      },
      {
        headerName: 'T',
        colId: 'tipo',
        width: 70,
        valueGetter: params => {
          if (!params.node.isRowPinned()) {
            const aju = params.data;
            const cc = aju.concepto;
            return cc.tipo.toString().substring(0, 1);
          }
        },
        pinned: 'left'
      },
      {
        headerName: 'Gpo',
        colId: 'grupo',
        width: 150,
        valueGetter: params => {
          if (!params.node.isRowPinned()) {
            const aju = params.data;
            const cc = aju.concepto;
            return cc.grupo;
          }
        },
        pinned: 'left'
      },
      ...mesesDef
    ];
  }
}
