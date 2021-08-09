import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromAuth from 'app/auth/store';

import { AuthSession } from 'app/auth/models/authSession';

@Component({
  selector: 'sx-footer',
  template: `
    <div layout="row" layout-align="start center">
      <span class="md-caption">Copyright &copy; 2017 Luxsoft Mx. All rights reserved</span>
      <span flex></span>
      <ng-container *ngIf="session">
        <mat-icon color="accent">person</mat-icon>
        <span class="pad-left">{{session.username}}</span>
      </ng-container>
    </div>
  `
})
export class FooterComponent implements OnInit {
  @Input() session: AuthSession;

  constructor(private store: Store<fromAuth.AuthState>) {}

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.getSession))
      .subscribe(session => (this.session = session));
  }
}
