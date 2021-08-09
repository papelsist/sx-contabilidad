import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';
import { AjusteConcepto } from '../../model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sx-conceptos-page',
  templateUrl: './conceptos-page.component.html',
  styles: []
})
export class ConceptosPageComponent implements OnInit {
  conceptos$: Observable<AjusteConcepto[]>;
  activos$: Observable<AjusteConcepto[]>;
  pasivos$: Observable<AjusteConcepto[]>;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.conceptos$ = this.store.pipe(select(fromStore.selectConceptos));
    this.activos$ = this.conceptos$.pipe(
      map(data => data.filter(item => item.tipo === 'ACTIVO'))
    );
    this.pasivos$ = this.conceptos$.pipe(
      map(data => data.filter(item => item.tipo === 'PASIVO'))
    );

    this.store.dispatch(new fromStore.LoadConceptos());
  }
}
