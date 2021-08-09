import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cheque, ChequesFilter } from '../../models/cheque';
import { MatDialog } from '@angular/material';


import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromSelectors from '../../store/cheques.selectors';
import * as fromActions from '../../store/cheque.actions';
import { FechaDialogComponent } from '../../../../_shared/components/fecha-dilog/fecha.dialog.component';

@Component({
  selector: 'sx-cheques-page',
  templateUrl: './cheques-page.component.html',
  styles: []
})
export class ChequesPageComponent implements OnInit {

  cheques$: Observable<Cheque[]>;
  search = '';
  filter$: Observable<ChequesFilter>;

  constructor( private dialog: MatDialog, private store: Store<fromStore.State>) { }

  ngOnInit() {

    this.cheques$ = this.store.pipe(select(fromSelectors.getAllCheques));
    this.filter$ = this.store.pipe(select(fromSelectors.getChequesFilter));
  }

  onSelect() {}

  onFilterChange(filter: ChequesFilter) {
    this.store.dispatch(new fromActions.SetChequesFilter({filter}));
  }

  onLiberar(event: Cheque) {}

  onEntregar(event: Cheque) {}

  reload() {
    this.store.dispatch(new fromActions.LoadCheques());
  }

  onCobro(event: Cheque) {

    this.dialog
      .open(FechaDialogComponent, {
        data: { fecha: event.fecha }
      })
      .afterClosed()
      .subscribe((res: Date) => {
        if (res) {
          const cheque = {
            id: event.id,
            changes: { fechaTransito: res.toISOString() }
          };
           this.store.dispatch(new fromActions.UpdateCheque({ cheque }));
        }
      });
  }

}
