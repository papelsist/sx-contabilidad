import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';

import { SatMetadata } from 'app/auditoria/models';
import {
  map,
  switchMap,
  take,
  tap,
  filter,
  withLatestFrom
} from 'rxjs/operators';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-metadata-page',
  templateUrl: './metadata-page.component.html'
})
export class MetadataPageComponent implements OnInit {
  loading$: Observable<boolean>;
  data$: Observable<SatMetadata[]>;
  filter$: Observable<any>;

  constructor(
    private store: Store<fromStore.State>,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.selectMetadataLoading));
    this.filter$ = this.store.pipe(select(fromStore.selectMetadataFilter));
    this.data$ = this.store.pipe(select(fromStore.selectMetadata));
    this.loadInitialData();
  }

  /**
   * Loads metadata only once
   */
  private loadInitialData() {
    const loaded$ = this.store.pipe(select(fromStore.selectMetadataLoaded));
    this.filter$
      .pipe(
        withLatestFrom(loaded$),
        tap(data => {
          const per = data[0];
          const loaded = data[1];
          if (!loaded) {
            this.reload(per);
          }
        }),
        filter(data => data[1]), // Waiting for loaded,
        take(1) // To avoid memory leaks
      )
      .subscribe();
  }

  importarMetadata(event: any) {
    this.dialogService
      .openConfirm({
        message: `Para el ejercicio: ${event.ejercicio} mes: ${event.mes}`,
        title: 'Importar metadata del SAT',
        acceptButton: 'IMPORTAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.ImportarMetadata({ filter: event })
          );
        }
      });
  }

  reload(data: any) {
    this.store.dispatch(new fromStore.LoadMetadata({ filter: data }));
  }

  onCambiarPeriodo(event: any) {
    this.store.dispatch(new fromStore.SetMetadataFilter({ filter: event }));
  }
}
