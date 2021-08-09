import { Action } from '@ngrx/store';

import { Authenticate } from '../../models/authenticate';
import { User } from '../../models/user';
import { AuthSession } from '../../models/authSession';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAIL = '[Auth] Login Fail',
  LOGIN_REDIRECT = '[Auth] Login Redirect',
  LOGOUT = '[Auth] Logout',
  LoadUserSession = '[Auth Component] Load User session',
  LoadUserSessionFail = '[Auth API effect] Load User session fail',
  LoadUserSessionSuccess = '[Auth API effect] Load User session success'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: Authenticate) {}
}
export class LoginFail implements Action {
  readonly type = AuthActionTypes.LOGIN_FAIL;
  constructor(public payload: any) {}
}
export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: AuthSession) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LOGIN_REDIRECT;
}

export class LoadUserSession implements Action {
  readonly type = AuthActionTypes.LoadUserSession;
}
export class LoadUserSessionSuccess implements Action {
  readonly type = AuthActionTypes.LoadUserSessionSuccess;
  constructor(public payload: { sessionInfo: any }) {}
}

export type AuthActions =
  | Login
  | LoginFail
  | LoginSuccess
  | Logout
  | LoginRedirect
  | LoadUserSession
  | LoadUserSessionSuccess;
