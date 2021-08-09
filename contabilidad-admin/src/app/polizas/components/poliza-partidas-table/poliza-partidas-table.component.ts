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
import { formatCurrency } from '@angular/common';

import { PolizaDet, Poliza } from '../../models';
import {
  GridOptions,
  FilterChangedEvent,
  GridReadyEvent,
  GridApi,
  RowDoubleClickedEvent,
  CellDoubleClickedEvent,
  CellContextMenuEvent,
  ColDef
} from 'ag-grid-community';

import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'sx-poliza-partidas-table',
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
        [enableColResize]="true"
        [animateRows]="true"
        [floatingFilter]="true"
        [localeText]="localeText"
        (firstDataRendered)="onFirstDataRendered($event)"
        (gridReady)="onGridReady($event)"
        (modelUpdated)="onModelUpdate($event)">
      </ag-grid-angular>
      <span style="position: fixed"
        [matMenuTriggerFor]="contextMenu"
        [style.left]="contextMenuPosition.x"
        [style.top]="contextMenuPosition.y">
      </span>
      <mat-menu #contextMenu="matMenu">
        <ng-template matMenuContent let-item="item" let-index="index">
          <button mat-menu-item (click)="copiarRegistro(item)">
            <mat-icon>content_copy</mat-icon>
            <span>Copiar</span>
          </button>
          <button mat-menu-item (click)="eliminarRegistro(item, index)" color="warning">
            <mat-icon color="warn">delete</mat-icon>
            <span>Eliminar</span>
          </button>
          <button mat-menu-item (click)="prorratearRegistro(item, index)" >
            <mat-icon>call_split</mat-icon>
            <span>Prorratear en sucursales</span>
          </button>
	      </ng-template>
      </mat-menu>
    </div>
  `,
  styles: [
    `
      .myGrid {
        width: 100%;
        height: 95%;
      }
      .print {
        width: '';
        height: '';
      }
    `
  ]
})
export class PolizaPartidasTableComponent implements OnInit, OnChanges {
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
  edit = new EventEmitter<Partial<PolizaDet>>();

  @Output()
  reclasificar = new EventEmitter<{ row: any; data: any }>();

  @Output()
  doubleClick = new EventEmitter();

  @Output()
  totalesChanged = new EventEmitter<{ debe: number; haber: number }>();

  @Output()
  copy = new EventEmitter();

  @Output()
  delete = new EventEmitter<{ index: number; data: Partial<PolizaDet> }>();

  @Output()
  prorratear = new EventEmitter<{ index: number; data: Partial<PolizaDet> }>();

  printFriendly = false;

  localeText;

  pinnedBottomRowData;
  frameworkComponents;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  @Input()
  manual = false;

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
    this.gridOptions.onRowDoubleClicked = this.onDoubleClick.bind(this);
    this.buildLocalText();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.partidas && changes.partidas.currentValue) {
      if (this.gridApi) {
        this.gridApi.setRowData(changes.partidas.currentValue);
      }
    }
  }

  ngOnInit() {
    this.gridOptions.onCellDoubleClicked = this.doulbeClickHandler.bind(this);
    this.gridOptions.onCellContextMenu = this.openContextMenu.bind(this);
  }

  doulbeClickHandler(event: CellDoubleClickedEvent) {
    const id = event.column.getColId();
    const row = event.rowIndex;
    if (id === 'clave') {
      this.reclasificar.emit({ row, data: event.data });
    }
    if (id === 'concepto' || id === 'descripcion') {
      if (this.manual) {
        this.edit.emit(event.data);
      }
    }
  }

  openContextMenu(ce: CellContextMenuEvent) {
    if (this.manual) {
      const event: MouseEvent = ce.event as MouseEvent;
      event.preventDefault();
      const { x, y } = event;
      this.contextMenuPosition.x = x + 'px';
      this.contextMenuPosition.y = y + 'px';
      this.contextMenu.menuData = { item: ce.data, index: ce.rowIndex };
      this.cd.detectChanges();
      this.contextMenu.openMenu();
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
    // params.api.sizeColumnsToFit();
  }

  onFilter(event: FilterChangedEvent) {}

  onDoubleClick(event: RowDoubleClickedEvent) {
    this.doubleClick.emit(event.data);
  }

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

  exportData(poliza: Poliza) {
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
      fileName: `POL_${poliza.subtipo}_${poliza.folio}_${poliza.ejercicio}_${
        poliza.mes
      }.csv`
      // columnSeparator: document.querySelector("#columnSeparator").value
    };
    this.gridApi.exportDataAsCsv(params);
  }

  private buildColsDef() {
    return [
      {
        headerName: 'Cuenta',
        field: 'clave',
        width: 170,
      },
      {
        headerName: 'Descripción de la cuenta',
        field: 'concepto',
        width: 200,
      },
      {
        headerName: 'Concepto',
        field: 'descripcion',
        width: 280,
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
        headerName: 'Sucursal',
        field: 'sucursal',
        columnGroupShow: 'open'
      },
      { headerName: 'Ref', field: 'referencia', columnGroupShow: 'open' },
      {
        headerName: 'Ref2',
        field: 'referencia2'
      },
      { headerName: 'Origen', field: 'origen', columnGroupShow: 'open' },
      { headerName: 'Entidad', field: 'entidad', columnGroupShow: 'open' },
      { headerName: 'Docto', field: 'documento', columnGroupShow: 'open' },
          {
            headerName: 'Docto T',
            field: 'documentoTipo',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Docto F',
            field: 'documentoFecha',
            filter: 'agDateColumnFilter',
            columnGroupShow: 'open'
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

  copiarRegistro(event) {
    // console.log('Copiando registro: ', event);
    this.copy.emit(event);
  }

  eliminarRegistro(event, index: number) {
    // console.log('Delete registro: ', event, index);
    this.delete.emit({ index, data: event });
  }

  prorratearRegistro(event, index: number) {
    this.prorratear.emit({ index, data: event });
  }
}
