import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable, Subscription } from 'rxjs';

import { AuditoriaFiscalCfdi } from 'app/auditoria/models';

import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-auditoria-cfdi-page',
  templateUrl: './auditoria-cfdi-page.component.html',
  styleUrls: ['./auditoria-cfdi-page.component.scss']
})
export class AuditoriaCfdiPageComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  data$: Observable<AuditoriaFiscalCfdi[]>;
  filter$: Observable<any>;
  subs: Subscription;

  constructor(
    private store: Store<fromStore.State>,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.selectAuditoriaLoading));
    this.filter$ = this.store.pipe(select(fromStore.selectAuditoriaFilter));
    this.data$ = this.store.pipe(select(fromStore.selectAuditoriaCfdi));
    this.subs = this.filter$.subscribe( f => this.reload(f));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  generar(event: any) {
    this.dialogService
      .openConfirm({
        title: 'GENRAR REVISICION',
        message: `Para el ejercicio: ${event.ejercicio} mes: ${event.mes}`,
        acceptButton: 'GENERAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.GenerarAuditoriaCfdi({ filter: event })
          );
        }
      });
  }

  reload(data: any) {
    this.store.dispatch(new fromStore.LoadAuditoriaCfdi({ filter: data }));
  }

  onCambiarPeriodo(event: any) {
    this.store.dispatch(
      new fromStore.SetAuditoriaCfdiFilter({ filter: event })
    );
    this.reload(event);
  }
}
