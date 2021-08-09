import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import * as _ from 'lodash';

import {
  ColDef,
  GridOptions,
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';

import { SxTableService } from 'app/_shared/components/lx-table/sx-table.service';
import { spAgGridText } from 'app/_shared/components/lx-table/table-support';

@Component({
  selector: 'sx-sumary-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="height: 600px">
      <ag-grid-angular
        #agGrid
        class="ag-theme-balham"
        style="width: 500px; height: 100%;"
        [rowData]="rows"
        [gridOptions]="gridOptions"
        [enableSorting]="false"
        [floatingFilter]="false"
        [localeText]="localeText"
        (gridReady)="onGridReady($event)"
      >
      </ag-grid-angular>
    </div>
  `,
  styles: [``]
})
export class SumaryTableComponent implements OnInit {
  @Input()
  rows: any[] = [];

  @Input()
  tipo = 'DDD';

  @Input()
  label = '';

  @Output()
  select = new EventEmitter<any[]>();

  gridOptions: GridOptions;

  gridApi: GridApi;

  localeText: any;

  constructor(public tableService: SxTableService) {
    this.buildGridOptions();
  }

  ngOnInit() {}

  buildGridOptions() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.buildColsDef();
    this.gridOptions.rowMultiSelectWithClick = true;
    this.gridOptions.enableSorting = false;
    this.gridOptions.enableColResize = true;
    this.gridOptions.onRowDoubleClicked = params => {
      this.select.emit(params.data);
    };
    this.localeText = spAgGridText;
    this.gridOptions.getRowStyle = this.buildRowStyle.bind(this);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    // this.gridOptions.columnApi.autoSizeAllColumns();
  }

  exportData() {
    const params = {
      fileName: `AJUSTE_ANUAL_${this.tipo}_${new Date().getTime()}.csv`
    };
    this.gridApi.exportDataAsCsv(params);
  }

  buildRowStyle(params: any) {
    if (params.data.grupo === 'BOLD') {
      return {
        'font-weight': 'bold',
        'font-style': 'italic',
        'text-align': 'center',
        background: 'rgb(233, 221, 221)'
      };
    }
    return {};
  }

  buildColsDef(): ColDef[] {
    return [
      {
        headerName: 'Mes',
        field: 'descripcion',
        width: 250
      },
      {
        headerName: `Promedio Anual ` + this.label,
        field: 'importe',
        width: 250,
        valueFormatter: params => {
          if (params.data.tipo === 'moneda') {
            return this.tableService.formatCurrency(params.value);
          }
          return params.value;
        }
      }
    ];
  }
}
