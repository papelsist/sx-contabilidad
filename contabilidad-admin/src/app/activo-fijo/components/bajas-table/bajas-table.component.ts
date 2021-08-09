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
  GridReadyEvent,
  ColGroupDef
} from 'ag-grid-community';

import { SxTableService } from 'app/_shared/components/lx-table/sx-table.service';
import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';
import { spAgGridText } from 'app/_shared/components/lx-table/table-support';
import { BajaDeActivo } from 'app/activo-fijo/models/baja-de-activo';

@Component({
  selector: 'sx-bajas-table',
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
export class BajasTableComponent implements OnInit, OnChanges {
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
    this.gridOptions.rowSelection = 'single';
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
      }
      return {};
    };
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  exportData() {
    const params = {
      fileName: `BAJAS_AF_${new Date().getTime()}.csv`
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
    let moiContable = 0;
    let depreciacionContable = 0;
    let remanenteContable = 0;
    let importeDeVenta = 0;
    let utilidadContable = 0;
    let perdidaContable = 0;

    let depreciacionFiscalAcunulada = 0;
    let costoFiscal = 0;
    let costoFiscalActualizado = 0;
    let utilidadFiscal = 0;
    let perdidaFiscal = 0;

    this.gridApi.forEachNodeAfterFilter((rowNode, index) => {
      const row: BajaDeActivo = rowNode.data.baja;
      moiContable += row.moiContable;
      depreciacionContable += row.depreciacionContable;
      remanenteContable += row.remanenteContable;
      importeDeVenta += row.importeDeVenta;
      if (row.utilidadContable > 0) {
        utilidadContable += row.utilidadContable;
      } else {
        perdidaContable += row.utilidadContable * -1;
      }
      depreciacionFiscalAcunulada += row.depreciacionFiscalAcunulada;
      costoFiscal += row.costoFiscal;
      costoFiscalActualizado += row.costoFiscalActualizado;

      if (row.utilidadFiscal > 0) {
        utilidadFiscal += row.utilidadFiscal;
      } else {
        perdidaFiscal += row.utilidadFiscal * -1;
      }

      registros++;
    });
    const res = [
      {
        descripcion: `Registros: ${registros}`,
        moiContable,
        depreciacionContable,
        remanenteContable,
        importeDeVenta,
        utilidadContable,
        perdidaContable,
        depreciacionFiscalAcunulada,
        costoFiscal,
        costoFiscalActualizado,
        utilidadFiscal,
        perdidaFiscal
      }
    ];
    this.gridApi.setPinnedBottomRowData(res);
  }

  clearSelection() {
    this.gridApi.deselectAll();
  }

  buildColsDef(): ColGroupDef[] {
    return [
      {
        headerName: 'Activo',
        children: [
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
            headerName: 'Factura venta',
            colId: 'facturaSerie',
            width: 110,
            pinned: 'left',
            valueGetter: params => {
              if (params.data && params.data.baja) {
                const baja = params.data.baja;
                return `${baja.facturaSerie} - ${baja.facturaFolio}`;
              }
            }
          }
        ]
      },
      {
        headerName: 'Contable',
        children: [
          {
            headerName: 'MOI',
            colId: 'moiContable',
            width: 110,
            valueGetter: params => {
              if (params.data && params.data.baja) {
                return params.data.baja.moiContable;
              } else {
                return 0;
              }
            },
            valueFormatter: params =>
              this.tableService.formatCurrency(params.value),
            pinnedRowValueFormatter: p => {
              const v = p.data[p.column.getColId()];
              return this.tableService.formatCurrency(v);
            }
          },
          {
            headerName: 'Depreciado',
            colId: 'depreciacionContable',
            width: 110,
            valueGetter: params => {
              if (params.data && params.data.baja) {
                return params.data.baja.depreciacionContable;
              } else {
                return 0;
              }
            },
            valueFormatter: params =>
              this.tableService.formatCurrency(params.value),
            pinnedRowValueFormatter: p => {
              const v = p.data[p.column.getColId()];
              return this.tableService.formatCurrency(v);
            }
          },
          {
            headerName: 'Costo ',
            colId: 'remanenteContable',
            width: 110,
            valueGetter: params => {
              if (params.data && params.data.baja) {
                return params.data.baja.remanenteContable;
              } else {
                return 0;
              }
            },
            valueFormatter: params =>
              this.tableService.formatCurrency(params.value),
            pinnedRowValueFormatter: p => {
              const v = p.data[p.column.getColId()];
              return this.tableService.formatCurrency(v);
            }
          },
          {
            headerName: 'Precio Venta',
            colId: 'importeDeVenta',
            width: 130,
            valueFormatter: params =>
              this.tableService.formatCurrency(params.value),
            valueGetter: params => {
              if (params.data && params.data.baja) {
                return params.data.baja.importeDeVenta;
              } else {
                return 0;
              }
            },
            pinnedRowValueFormatter: p => {
              const v = p.data[p.column.getColId()];
              return this.tableService.formatCurrency(v);
            }
          },
          {
            headerName: 'Utilidad',
            colId: 'utilidadContable',
            width: 130,
            valueFormatter: params =>
              this.tableService.formatCurrency(params.value),
            valueGetter: params => {
              if (params.data && params.data.baja) {
                const utilidad = params.data.baja.utilidadContable;
                return utilidad > 0 ? utilidad : 0.0;
              }
            },
            pinnedRowValueFormatter: p => {
              const v = p.data[p.column.getColId()];
              return this.tableService.formatCurrency(v);
            }
          },
          {
            headerName: 'Pérdida',
            colId: 'perdidaContable',
            width: 130,
            valueFormatter: params =>
              this.tableService.formatCurrency(params.value),
            valueGetter: params => {
              if (params.data && params.data.baja) {
                const utilidad = params.data.baja.utilidadContable;
                return utilidad < 0 ? utilidad * -1 : 0.0;
              }
            },
            pinnedRowValueFormatter: p => {
              const v = p.data[p.column.getColId()];
              return this.tableService.formatCurrency(v);
            }
          }
        ]
      },
      {
        headerName: 'Fiscal',
        children: [
          {
            headerName: 'Depreciado',
            colId: 'depreciacionFiscalAcunulada',
            width: 110,
            valueGetter: params => {
              if (params.data && params.data.baja) {
                return params.data.baja.depreciacionFiscalAcunulada;
              } else {
                return 0;
              }
            },
            valueFormatter: params =>
              this.tableService.formatCurrency(params.value),
            pinnedRowValueFormatter: p => {
              const v = p.data[p.column.getColId()];
              return this.tableService.formatCurrency(v);
            }
          },
          {
            headerName: 'Costo ',
            colId: 'costoFiscal',
            width: 110,
            valueGetter: params => {
              if (params.data && params.data.baja) {
                return params.data.baja.costoFiscal;
              } else {
                return 0;
              }
            },
            valueFormatter: params =>
              this.tableService.formatCurrency(params.value),
            pinnedRowValueFormatter: p => {
              const v = p.data[p.column.getColId()];
              return this.tableService.formatCurrency(v);
            }
          },
          {
            headerName: 'Costo Act ',
            colId: 'costoFiscalActualizado',
            width: 110,
            valueGetter: params => {
              if (params.data && params.data.baja) {
                return params.data.baja.costoFiscalActualizado;
              } else {
                return 0;
              }
            },
            valueFormatter: params =>
              this.tableService.formatCurrency(params.value),
            pinnedRowValueFormatter: p => {
              const v = p.data[p.column.getColId()];
              return this.tableService.formatCurrency(v);
            }
          },
          {
            headerName: 'Utilidad ',
            colId: 'utilidadFiscal',
            width: 110,
            valueFormatter: params =>
              this.tableService.formatCurrency(params.value),
            valueGetter: params => {
              if (params.data && params.data.baja) {
                const utilidad = params.data.baja.utilidadFiscal;
                return utilidad > 0 ? utilidad : 0.0;
              }
            },
            pinnedRowValueFormatter: p => {
              const v = p.data[p.column.getColId()];
              return this.tableService.formatCurrency(v);
            }
          },
          {
            headerName: 'Pérdida',
            colId: 'perdidaFiscal',
            width: 110,
            valueFormatter: params =>
              this.tableService.formatCurrency(params.value),
            valueGetter: params => {
              if (params.data && params.data.baja) {
                const utilidad = params.data.baja.utilidadFiscal;
                return utilidad < 0 ? utilidad : 0.0;
              }
            },
            pinnedRowValueFormatter: p => {
              const v = p.data[p.column.getColId()];
              return this.tableService.formatCurrency(v);
            }
          }
        ]
      }
    ];
  }
}
