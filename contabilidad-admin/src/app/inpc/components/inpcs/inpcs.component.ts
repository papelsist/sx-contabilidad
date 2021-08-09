import { Component, OnInit, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';

import { TdDialogService } from '@covalent/core';

import * as _ from 'lodash';
import { Inpc } from 'app/inpc/models/inpc';
import { InpcModalComponent } from '../inpc-modal/inpc-modal.component';

@Component({
  selector: 'sx-inpcs',
  templateUrl: './inpcs.component.html',
  styleUrls: ['./inpcs.component.scss']
})
export class InpcsComponent implements OnInit {
  inpcs$: Observable<Inpc[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.selectInpcLoading));
    this.inpcs$ = this.store.pipe(select(fromStore.selectInpc));
    this.inpcs$.subscribe( res => console.log('Registros: ', res.length));
    this.reload();
  }

  reload() {
    this.store.dispatch(new fromStore.LoadInpcs());
  }

  onCreate() {
    this.dialog
      .open(InpcModalComponent, {
        data: {}
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.CreateInpc({ inpc: res }));
        }
      });
  }

  onSelect(event: Inpc) {
    this.dialog
      .open(InpcModalComponent, {
        data: { inpc: event }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.UpdateInpc({ inpc: { id: event.id, changes: res } })
          );
        }
      });
  }

  onDelete(event: Inpc) {
    this.dialogService
      .openConfirm({
        message: `ELIMINAR INPC: ${event.ejercicio} - ${event.mes}`,
        title: 'INPC',
        acceptButton: 'ELIMINAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.DeleteInpc({ id: event.id }));
        }
      });
  }

  @HostListener('document:keydown.meta.i', ['$event'])
  onHotKeyInsert(event) {
    this.onCreate();
  }

  @HostListener('document:keydown.insert', ['$event'])
  onHotKeyInsert2(event) {
    this.onCreate();
  }
}
