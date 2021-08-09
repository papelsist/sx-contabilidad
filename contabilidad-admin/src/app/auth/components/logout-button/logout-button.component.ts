import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'sx-logout-button',
  template: `
    <a mat-icon-button matTooltip="Salir del sistema" (click)="logout()" >
      <mat-icon>exit_to_app</mat-icon>
    </a>
  `
})
export class LogoutButtonComponent implements OnInit {
  constructor(private store: Store<fromStore.AuthState>) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(new fromStore.Logout());
  }
}
