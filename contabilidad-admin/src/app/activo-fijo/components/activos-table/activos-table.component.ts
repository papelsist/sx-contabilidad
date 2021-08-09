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
import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';
import { spAgGridText } from 'app/_shared/components/lx-table/table-support';

@Component({
  selector: 'sx-activos-table',
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
export class ActivosTableComponent implements OnInit, OnChanges {
  @Input()
  activos: ActivoFijo[] = [];

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
      width: 100
    };
    this.localeText = spAgGridText;
    this.gridOptions.getRowStyle = params => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      } else if (params.data.estado === 'DEPRECIADO') {
        return { color: 'blue', 'font-style': 'italic' };
      } else if (params.data.estado === 'VENDIDO') {
        return { color: 'green', 'font-style': 'italic' };
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
    let montoOriginal = 0;
    let depreciacionInicial = 0;
    let depreciacionAcumulada = 0;
    let ultimaDepreciacion = 0;
    let remanente = 0;
    let ultimaDepreciacionFiscal = 0;
    this.gridApi.forEachNodeAfterFilter((rowNode, index) => {
      const row: ActivoFijo = rowNode.data;
      montoOriginal += row.montoOriginal;
      depreciacionInicial += row.depreciacionInicial;
      depreciacionAcumulada += row.depreciacionAcumulada;
      ultimaDepreciacion += row.ultimaDepreciacion;
      remanente += row.remanente;
      ultimaDepreciacionFiscal += row.ultimaDepreciacionFiscal || 0.0;
      registros++;
    });
    const res = [
      {
        descripcion: `Registros: ${registros}`,
        montoOriginal,
        depreciacionInicial,
        depreciacionAcumulada,
        remanente,
        ultimaDepreciacion,
        ultimaDepreciacionFiscal
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
        headerName: 'Id',
        field: 'id',
        pinned: 'left'
      },
      {
        headerName: 'Descripción',
        field: 'descripcion',
        pinned: 'left',
        width: 250,
        pinnedRowCellRenderer: r => r.value
      },
      {
        headerName: 'Cuenta contable',
        field: 'cuentaContable',
        pinned: 'left',
        width: 200,
        valueGetter: params => {
          if (params.data && params.data.cuentaContable) {
            return params.data.cuentaContable.descripcion;
          } else {
            return '';
          }
        }
        // valueFormatter: params => (params.value ? params.value.descripcion : '')
      },
      {
        headerName: 'Sucursal',
        field: 'sucursalActual',
        width: 90
      },
      {
        headerName: 'E',
        field: 'estado',
        width: 60,
        valueFormatter: params =>
          params.value ? params.value.toString().substring(0, 3) : ''
      },
      {
        headerName: 'Adquisicion',
        field: 'adquisicion',
        valueFormatter: params => this.tableService.formatDate(params.value)
      },
      {
        headerName: 'Tasa D',
        field: 'tasaDepreciacion',
        valueFormatter: params => this.tableService.formatPercent(params.value),
        pinnedRowValueFormatter: params => ''
      },
      {
        headerName: 'MOI',
        field: 'montoOriginal',
        width: 120,
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Inicial',
        field: 'depreciacionInicial',
        width: 120,
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Acumulada',
        field: 'depreciacionAcumulada',
        width: 120,
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Remanente',
        field: 'remanente',
        width: 130,
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'F. Depreciado',
        field: 'depreciado',
        width: 110,
        valueFormatter: params => this.tableService.formatDate(params.value)
      },
      {
        headerName: 'U. Dep (P)',
        field: 'ultimaDepreciacionFecha',
        width: 120,
        valueFormatter: params =>
          this.tableService.formatDate(params.value, 'MM/yyyy')
      },
      // {
      //   headerName: 'U. Dep',
      //   field: 'ultimaDepreciacion',
      //   width: 120,
      //   valueFormatter: params => this.tableService.formatCurrency(params.value)
      // },
      // {
      //   headerName: 'Estado',
      //   field: 'estado'
      // },
      // {
      //   headerName: 'Fac Ser',
      //   field: 'facturaSerie'
      // },
      // {
      //   headerName: 'Fac Folio',
      //   field: 'facturaFolio'
      // },
      {
        headerName: 'U. Dep Fiscal',
        field: 'ultimaDepreciacionFiscal',
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'U Dep Ej',
        field: 'ultimaDepreciacionFiscalEjercicio'
      },
      {
        headerName: 'INPC (A)',
        field: 'inpcDelMesAdquisicion'
      },
      {
        headerName: 'INPC (USO)',
        field: 'inpcPrimeraMitad'
      }
    ];
  }
}
