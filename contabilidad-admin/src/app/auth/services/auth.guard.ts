import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../store';
import * as fromAuth from '../store/actions/auth.actions';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromStore.AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.isLoggedIn),
      // tap(loggedIn => console.log('LoggedIn: ', loggedIn)),
      map(loggedIn => {
        if (!loggedIn) {
          this.store.dispatch(new fromRoot.Go({ path: ['/login'] }));
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
