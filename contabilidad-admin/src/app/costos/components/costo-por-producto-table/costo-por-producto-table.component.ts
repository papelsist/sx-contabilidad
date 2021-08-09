import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'sx-costo-producto-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './costo-por-producto-table.component.html',
  styleUrls: ['./costo-por-producto-table.component.scss']
})
export class CostoPorProductoTableComponent implements OnInit, OnChanges {
  @Input()
  movimientos: any[] = [];

  @Input()
  filter: string;
  dataSource = new MatTableDataSource<any>([]);

  @Input()
  displayColumns = [
    'clave',
    'costoInicial',
    'saldoInicial',
    'saldo',
    'inicialMovs',
    'diferencia',
    'costop',
    'costoCalculado',
    'difCosto',
    'costoInventario',
    'costoCalculadoInv',
    'difCostoInv',
    'deLinea',
    'descripcion'
  ];
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Output()
  select = new EventEmitter();

  @Input()
  selectedId: number;

  constructor() {}

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.movimientos && changes.movimientos.currentValue) {
      this.dataSource.data = changes.movimientos.currentValue;
    }
    if (changes.filter) {
      const val = changes.filter.currentValue || '';
      this.dataSource.filter = val.toLowerCase();
    }
  }
  getInicialMovs(costop) {
    return (
      costop.saldoInicial +
      costop.comsUni +
      costop.movsUni +
      costop.comsSinAUni +
      costop.decUni +
      costop.trasladosUni +
      costop.trsSalUni +
      costop.trsEntUni +
      costop.devUni +
      costop.vtaUni
    );
  }

  getDiferencia(costop) {
    return (
      costop.saldo -
      (costop.saldoInicial +
        costop.comsUni +
        costop.movsUni +
        costop.comsSinAUni +
        costop.decUni +
        costop.trasladosUni +
        costop.trsSalUni +
        costop.trsEntUni +
        costop.devUni +
        costop.vtaUni)
    );
  }

  getCostoCalculado(costop) {
    const saldoIni = costop.saldoInicial < 0 ? 0 : costop.saldoInicial;
    const costoIni = costop.saldoInicial < 0 ? 0 : costop.costoInicial;
    return saldoIni + costop.comsUni + costop.trsEntUni !== 0
      ? (costoIni + costop.comsCosto + costop.comsFlete + costop.comsMaq + costop.trsEntCosto) /
          (saldoIni + costop.comsUni + costop.trsEntUni)
      : 0.0;
  }

  getDifCosto(costop) {
    return costop.costop - this.getCostoCalculado(costop);
  }

  getCostoCalculadoInv(costop) {
    return this.getCostoCalculado(costop) * this.getInicialMovs(costop);
  }

  getDifCostoInv(costop) {
    return costop.costo - this.getCostoCalculadoInv(costop);
  }
}
