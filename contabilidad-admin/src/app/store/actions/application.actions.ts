import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum ApplicationActionTypes {
  SetGlobalLoading = '[Application] Set global loading',
  GlobalHttpError = '[Application] Set global Http error'
}

export class SetGlobalLoading implements Action {
  readonly type = ApplicationActionTypes.SetGlobalLoading;
  constructor(public payload: { loading: boolean }) {}
}

export class GlobalHttpError implements Action {
  readonly type = ApplicationActionTypes.GlobalHttpError;
  constructor(public payload: { response: HttpErrorResponse | any }) {}
}

export type ApplicationActions = SetGlobalLoading | GlobalHttpError;
