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
  GridReadyEvent,
  ValueFormatterParams
} from 'ag-grid-community';

import { SxTableService } from 'app/_shared/components/lx-table/sx-table.service';
import { spAgGridText } from 'app/_shared/components/lx-table/table-support';

@Component({
  selector: 'sx-resumen-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="height: 100%">
      <ag-grid-angular
        #agGrid
        class="ag-theme-balham"
        style="width: 100%; height: 100%;"
        [rowData]="activos"
        [gridOptions]="gridOptions"
        [defaultColDef]="defaultColDef"
        [floatingFilter]="false"
        [enableSorting]="false"
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
export class ResumenTableComponent implements OnInit, OnChanges {
  @Input()
  activos: any[] = [];

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
      filter: 'agTextColumnFilter'
    };
    this.localeText = spAgGridText;
    this.gridOptions.getRowStyle = params => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      } else if (params.data.tipo === 'HEADER') {
        return { color: 'blue', 'font-weight': 'bold', 'text-align': 'center' };
      } else if (params.data.tipo === 'ACUMULADO') {
        return { 'font-style': 'italic', 'font-weight': 'bold' };
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
    let importe = 0;
    let depreciacionHistorica = 0;
    let depreciacionAcumulada = 0;
    let saldoPorDeducir = 0;
    let depreciacionFiscal = 0;
    let saldoEnBalanza = 0;
    let diferencia = 0;
    this.gridApi.forEachNodeAfterFilter((rowNode, index) => {
      const row = rowNode.data;
      importe += row.importe;
      depreciacionHistorica += row.depreciacionHistorica;
      depreciacionAcumulada += row.depreciacionAcumulada;
      saldoPorDeducir += row.saldoPorDeducir;
      depreciacionFiscal += row.depreciacionFiscal;
      saldoEnBalanza += row.saldoEnBalanza;
      diferencia += row.diferencia;
      registros++;
    });
    const res = [
      {
        descripcion: `Total`,
        importe,
        depreciacionHistorica,
        depreciacionAcumulada,
        saldoPorDeducir,
        depreciacionFiscal,
        saldoEnBalanza,
        diferencia
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
        headerName: 'Concepto',
        field: 'descripcion',
        pinned: 'left',
        width: 250,
        pinnedRowCellRenderer: r => r.value
      },
      {
        headerName: 'Importe',
        field: 'importe',
        valueFormatter: this.myFormat.bind(this)
      },
      {
        headerName: 'Dep Acumulada Histórica',
        field: 'depreciacionHistorica',
        valueFormatter: this.myFormat.bind(this)
      },
      {
        headerName: 'Dep acumulada ejercicio',
        field: 'depreciacionAcumulada',
        valueFormatter: this.myFormat.bind(this)
      },
      {
        headerName: 'Saldo x deducir',
        field: 'saldoPorDeducir',
        valueFormatter: this.myFormat.bind(this)
      },
      {
        headerName: 'Dep Fiscal',
        field: 'depreciacionFiscal',
        valueFormatter: this.myFormat.bind(this)
      },
      {
        headerName: 'Saldo final en Balanza',
        field: 'saldoEnBalanza',
        valueFormatter: this.myFormat.bind(this)
      },
      {
        headerName: 'Diferencia',
        field: 'diferencia',
        valueFormatter: this.myFormat.bind(this)
      }
    ];
  }

  myFormat(params: ValueFormatterParams) {
    if (params.value !== 0.0) {
      return this.tableService.formatCurrency(params.value);
    } else {
      return '';
    }
  }
}
