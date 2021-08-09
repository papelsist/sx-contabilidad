import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  LOCALE_ID,
  Inject
} from '@angular/core';
import { formatDate, formatCurrency } from '@angular/common';

import {
  GridOptions,
  FilterChangedEvent,
  GridReadyEvent,
  GridApi
} from 'ag-grid-community';

import { PolizaDet, Poliza } from 'app/polizas/models';

@Component({
  selector: 'sx-polizadet-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style='height: 100%'>
      <ag-grid-angular #agGrid
        class="ag-theme-balham"
        [ngClass]="{myGrid: !printFriendly, print: printFriendly}"
        [gridOptions]="gridOptions"
        [defaultColDef]="defaultColDef"
        [enableFilter]="true"
        [enableSorting]="true"
        [floatingFilter]="true"
        [enableColResize]="true"
        [animateRows]="true"
        [localeText]="localeText"
        (firstDataRendered)="onFirstDataRendered($event)"
        (gridReady)="onGridReady($event)"
        (modelUpdated)="onModelUpdate($event)">
      </ag-grid-angular>
    </div>
  `,
  styles: [
    `
      .myGrid {
        width: 100%;
        height: 400px;
      }
    `
  ]
})
export class PolizadetTableComponent implements OnInit, OnChanges {
  @Input()
  partidas: PolizaDet[] = [];

  @Input()
  filter: string;

  @Input()
  selected: number;

  gridOptions: GridOptions;
  gridApi: GridApi;
  defaultColDef;

  @Output()
  select = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  @Output()
  totalesChanged = new EventEmitter<{ debe: number; haber: number }>();

  printFriendly = false;

  localeText;

  pinnedBottomRowData;
  frameworkComponents;

  constructor(
    private cd: ChangeDetectorRef,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.buildColsDef();
    this.defaultColDef = {
      width: 100,
      editable: false,
      filter: 'agTextColumnFilter'
    };
    this.gridOptions.onFilterChanged = this.onFilter;
    this.buildLocalText();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes: ', changes);
    if (changes.partidas && changes.partidas.currentValue) {
      // this.gridOptions.rowData = changes.partidas.currentValue;
      if (this.gridApi) {
        this.gridApi.setRowData(changes.partidas.currentValue);
      }
    }
  }

  onModelUpdate(event) {
    this.actualizarTotales();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.partidas);
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onFilter(event: FilterChangedEvent) {}

  actualizarTotales() {
    if (this.gridApi) {
      let debe = 0.0;
      let haber = 0.0;
      this.gridApi.forEachNodeAfterFilter((rowNode, index) => {
        debe += rowNode.data.debe;
        haber += rowNode.data.haber;
      });
      this.totalesChanged.emit({ debe, haber });
    }
  }

  printGrid() {
    this.gridApi.setDomLayout('print');
    this.printFriendly = true;
    this.cd.detectChanges();
    setTimeout(() => {
      print();
      this.gridApi.setDomLayout(null);
      this.printFriendly = false;
      this.cd.detectChanges();
    }, 8000);
  }

  exportData(cuenta) {
    const params = {
      // skipHeader: getBooleanValue("#skipHeader"),
      // columnGroups: getBooleanValue("#columnGroups"),
      // skipFooters: getBooleanValue("#skipFooters"),
      // skipGroups: getBooleanValue("#skipGroups"),
      // skipPinnedTop: getBooleanValue("#skipPinnedTop"),
      // skipPinnedBottom: getBooleanValue("#skipPinnedBottom"),
      // allColumns: getBooleanValue("#allColumns"),
      // onlySelected: getBooleanValue("#onlySelected"),
      // suppressQuotes: getBooleanValue("#suppressQuotes"),
      fileName: `AUX_${cuenta.clave}.csv`
      // columnSeparator: document.querySelector("#columnSeparator").value
    };
    this.gridApi.exportDataAsCsv(params);
  }

  private buildColsDef() {
    return [
      {
        headerName: 'Poliza',
        field: 'folio',
        width: 60
      },
      {
        headerName: 'Subtipo',
        field: 'subtipo',
        width: 100
      },
      {
        headerName: 'Concepto',
        field: 'descripcion',
        width: 280
      },
      {
        headerName: 'Debe',
        field: 'debe',
        filter: 'agNumberColumnFilter',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Haber',
        field: 'haber',
        filter: 'agNumberColumnFilter',
        cellRenderer: params => this.transformCurrency(params.value)
      },
      {
        headerName: 'Asiento',
        field: 'asiento'
      },
      {
        headerName: 'Referencias',
        marryChildren: true,
        openByDefault: 'false',
        children: [
          {
            headerName: 'Sucursal',
            field: 'sucursal',
            columnGroupShow: 'open'
          },
          { headerName: 'Ref', field: 'referencia', columnGroupShow: 'closed' },
          {
            headerName: 'Ref2',
            field: 'referencia2'
          },
          { headerName: 'Origen', field: 'origen', columnGroupShow: 'closed' },
          { headerName: 'Entidad', field: 'entidad', columnGroupShow: 'closed' }
        ]
      },
      {
        headerName: 'Documento',
        openByDefault: 'false',
        children: [
          { headerName: 'Docto', field: 'documento', columnGroupShow: 'open' },
          {
            headerName: 'Docto T',
            field: 'documentoTipo',
            columnGroupShow: 'closed'
          },
          {
            headerName: 'Docto F',
            field: 'documentoFecha',
            filter: 'agDateColumnFilter',
            columnGroupShow: 'closed'
          }
        ]
      }
    ];
  }

  buildLocalText() {
    this.localeText = {
      page: 'página',
      more: 'mas',
      to: 'a',
      of: 'de',
      next: 'siguiente',
      last: 'ultimo',
      first: 'primero',
      previous: 'anterior',
      loadingOoo: 'cargando...',
      applyFilter: 'Aplicar...',
      equals: 'igual',
      notEqual: 'diferente a',
      lessThan: 'menor que',
      greaterThan: 'mayor que',
      lessThanOrEqual: 'menor o igual',
      greaterThanOrEqual: 'mayor o igual',
      inRange: 'rango',
      contains: 'contiene',
      notContains: 'no contiene',
      startsWith: 'inicia con',
      endsWith: 'termina con',
      filters: 'filtros'
    };
  }

  transformCurrency(data) {
    return formatCurrency(data, this.locale, '$');
  }
}
