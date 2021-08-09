import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromActions from '../actions/auth.actions';

import { User } from '../../models/user';
import { AuthSession, readFromStore } from '../../models/authSession';

import * as moment from 'moment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

export interface AuthState {
  user: User;
  apiInfo: any;
  session: AuthSession;
  loading: boolean;
  authError: any;
}

const initialState: AuthState = {
  session: readFromStore(),
  user: undefined,
  apiInfo: undefined,
  loading: false,
  authError: undefined
};

export function reducer(state = initialState, action: fromActions.AuthActions) {
  switch (action.type) {
    case fromActions.AuthActionTypes.LOGIN: {
      return {
        ...state,
        loading: true,
        authError: undefined
      };
    }
    case fromActions.AuthActionTypes.LOGIN_FAIL: {
      const authError = action.payload;
      return {
        ...state,
        loading: false,
        session: undefined,
        authError
      };
    }
    case fromActions.AuthActionTypes.LOGIN_SUCCESS: {
      const session = action.payload;
      return {
        ...state,
        session,
        user: undefined,
        loading: false,
        authError: undefined
      };
    }

    case fromActions.AuthActionTypes.LOGOUT: {
      return {
        ...state,
        session: undefined,
        user: undefined
      };
    }

    case fromActions.AuthActionTypes.LoadUserSessionSuccess: {
      const info = action.payload.sessionInfo;
      return {
        ...state,
        user: info.user,
        apiInfo: info.apiInfo
      };
    }
  }
  return state;
}

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getAuthLoading = createSelector(
  getAuthState,
  state => state.loading
);

export const getSession = createSelector(getAuthState, state => state.session);

export const getLoggedIn2 = createSelector(
  getAuthState,
  state => state.session !== null
);

export const getTokenExpirationDate = createSelector(getSession, session => {
  if (session) {
    return helper.getTokenExpirationDate(session.access_token);
  } else {
    return undefined;
  }
});

export const isLoggedIn = createSelector(getSession, session => {
  if (session) {
    return !helper.isTokenExpired(session.access_token);
  } else {
    return false;
  }
});

export const getSessionExpiration = createSelector(
  getTokenExpirationDate,
  date => moment().to(date, true)
);

export const getUser = createSelector(getAuthState, state => state.user);

export const getApiInfo = createSelector(getAuthState, state => state.apiInfo);

export const getAuthError = createSelector(
  getAuthState,
  state => state.authError
);
