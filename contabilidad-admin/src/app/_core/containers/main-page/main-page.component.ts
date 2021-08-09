import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from 'app/store';
import * as fromAuth from 'app/auth/store';

import { of, Observable } from 'rxjs';
import { User } from 'app/auth/models/user';

@Component({
  selector: 'sx-main-page',
  templateUrl: './main-page.component.html',
  styles: []
})
export class MainPageComponent implements OnInit, OnDestroy {
  navigation: Array<{ icon: string; route: string; title: string }> = [
    {
      icon: 'home',
      route: '/',
      title: 'Inicio'
    },
    {
      icon: 'storage',
      route: '/cuentas',
      title: 'Catálogo de cuentas'
    },
    {
      icon: 'library_books',
      route: '/polizas',
      title: 'Polizas contables'
    },
    {
      icon: 'tune',
      route: '/saldos',
      title: 'Saldos (Balanza) / Auxiliares'
    },
    {
      icon: 'settings_input_component',
      route: '/costos',
      title: 'Costos'
    },
    {
      icon: 'settings_input_antenna',
      route: '/econta',
      title: 'Contabilidad SAT'
    },
    {
      icon: 'speaker_notes',
      route: '/fiscal',
      title: 'Fiscal'
    },
    {
      icon: 'build',
      route: '/operaciones',
      title: 'Operaciones'
    },
    {
      icon: 'spellcheck',
      route: '/auditoria',
      title: 'Auditoría'
    }
  ];

  usermenu: Array<{ icon: string; route: string; title: string }> = [
    {
      icon: 'person',
      route: '.',
      title: 'Cuenta'
    }
  ];

  modulo$: Observable<string>;
  expiration$: Observable<any>;
  apiInfo$: Observable<any>;
  user: User;
  sidenavWidth = 300;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.modulo$ = of('SX-CONTABILIDAD');
    this.store.dispatch(new fromAuth.LoadUserSession());

    this.expiration$ = this.store.pipe(select(fromAuth.getSessionExpiration));
    this.apiInfo$ = this.store.pipe(select(fromAuth.getApiInfo));

    this.store.pipe(select(fromAuth.getUser)).subscribe(u => (this.user = u));
  }

  ngOnDestroy() {}

  logout() {
    this.store.dispatch(new fromAuth.Logout());
  }
}
