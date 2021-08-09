import { Component, OnInit } from '@angular/core';
import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';

@Component({
  selector: 'sx-activo-create',
  templateUrl: './activo-create.component.html',
  styleUrls: ['./activo-create.component.scss']
})
export class ActivoCreateComponent implements OnInit {
  loading$: Observable<boolean>;
  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.selectActivosLoading));
  }

  onSave(event: Partial<ActivoFijo>) {
    this.store.dispatch(new fromStore.CreateActivo({ activo: event }));
  }

  onBack() {
    this.store.dispatch(new fromRoot.Go({ path: ['operaciones/activos'] }));
  }
}
