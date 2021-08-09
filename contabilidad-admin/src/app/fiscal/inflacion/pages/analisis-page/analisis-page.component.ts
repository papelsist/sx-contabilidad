import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { AjusteAnual } from '../../model';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AjusteAnualService } from '../../services/ajuste-anual.service';

function toAnalisis(rows: AjusteAnual[]) {
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ];
  const res = {};
  _.forEach(meses, item => {
    res[item] = _.sumBy(rows, data => {
      if (data.concepto.concepto === 'SUMA') {
        return data[item];
      }
    });
  });
  return res;
}

@Component({
  selector: 'sx-analisis-page',
  templateUrl: './analisis-page.component.html',
  styleUrls: ['./analisis-page.component.scss']
})
export class AnalisisPageComponent implements OnInit {
  activos$: Observable<AjusteAnual[]>;
  pasivos$: Observable<AjusteAnual[]>;

  activosList$: Observable<any>;
  pasivosList$: Observable<any>;

  activosSumary: any[];
  pasivosSumary: any[];

  @Input()
  ejercicio = 2018;
  @Input()
  mes = 12;

  meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ];

  constructor(
    private store: Store<fromStore.State>,
    private service: AjusteAnualService
  ) {}

  ngOnInit() {
    this.activos$ = this.store.pipe(select(fromStore.selectActivos));
    this.pasivos$ = this.store.pipe(select(fromStore.selectPasivos));

    this.activosList$ = this.activos$.pipe(map(toAnalisis));
    this.pasivosList$ = this.pasivos$.pipe(map(toAnalisis));
    this.load();
  }

  load() {
    this.service.sumary(this.ejercicio, this.mes).subscribe(data => {
      // console.log('Data: ', data);
      this.activosSumary = this.toRows(data.credito, 'creditos');
      this.pasivosSumary = this.toRows(data.debito, 'deudas');
    });
  }

  getPromedio(sumary: any) {
    const count = this.meses.length;
    let total = 0;
    _.forEach(this.meses, item => {
      total += sumary[item];
    });
    const prom = total / count;
    return _.round(prom, 2);
  }

  toRows(sumary: any, tipo: string): any[] {
    const rows = [];
    _.forIn(sumary, (value, key) => {
      const ent = {
        concepto: key,
        importe: value,
        descripcion: _.capitalize(key),
        grupo: 'normal',
        tipo: 'moneda'
      };
      if (ent.concepto.includes('total')) {
        ent.descripcion = 'SUMA';
        ent.grupo = 'BOLD';
      } else if (ent.concepto.includes('ajusteAnual')) {
        ent.descripcion = `Ajuste anual ${
          tipo === 'creditos' ? 'Deducible' : 'Acumulable'
        }`;
        ent.grupo = 'BOLD';
      } else if (ent.concepto === 'inpc') {
        ent.descripcion = `INPC ${this.ejercicio} / ${this.mes}`;
      } else if (ent.concepto === 'inpcAnterior') {
        ent.descripcion = `INPC ${this.ejercicio - 1} / ${this.mes}`;
      } else if (ent.concepto === 'inpcDesc') {
        ent.tipo = 'string';
      } else if (ent.concepto === 'meses') {
        ent.tipo = 'string';
      } else if (ent.concepto === 'promedioAnualDeudas') {
        ent.descripcion = 'Promedio Anual Deudas';
      } else if (ent.concepto === 'promedioAnualCreditos') {
        ent.descripcion = 'Promedio Anual Créditos';
      } else if (ent.concepto === 'factor') {
        ent.tipo = 'numero';
      }
      rows.push(ent);
    });
    return rows;
  }
}
