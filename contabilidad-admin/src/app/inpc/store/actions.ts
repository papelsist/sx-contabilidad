import { Action } from '@ngrx/store';

import { Update } from '@ngrx/entity';
import { Inpc } from '../models/inpc';

export enum InpcActionTypes {
  LoadInpcs = '[Inpcs Component] Load inpcs',
  LoadInpcsFail = '[Inpcs API] Load inpcs fail',
  LoadInpcsSuccess = '[Inpcs API] Load inpcs success',
  // Create
  CreateInpc = '[Inpcs Component] Create inpcs',
  CreateInpcFail = '[Inpc API] Create inpcs fail',
  CreateInpcSuccess = '[Inpc API] Create inpcs success',
  // Update
  UpdateInpc = '[Inpcs Component] Update inpcs',
  UpdateInpcFail = '[Inpc API] Update inpcs fail',
  UpdateInpcSuccess = '[Inpc API] Update inpcs success',
  // Delete
  DeleteInpc = '[Inpcs Component] Delete inpcs',
  DeleteInpcFail = '[Inpc API] Delete inpcs fail',
  DeleteInpcSuccess = '[Inpc API] Delete inpcs success'
}

export class LoadInpcs implements Action {
  readonly type = InpcActionTypes.LoadInpcs;
}
export class LoadInpcsFail implements Action {
  readonly type = InpcActionTypes.LoadInpcsFail;
  constructor(public payload: { response: any }) {}
}
export class LoadInpcsSuccess implements Action {
  readonly type = InpcActionTypes.LoadInpcsSuccess;
  constructor(public payload: { inpcs: Inpc[] }) {}
}
// Create
export class CreateInpc implements Action {
  readonly type = InpcActionTypes.CreateInpc;
  constructor(public payload: { inpc: Inpc }) {}
}
export class CreateInpcFail implements Action {
  readonly type = InpcActionTypes.CreateInpcFail;
  constructor(public payload: { response: any }) {}
}
export class CreateInpcSuccess implements Action {
  readonly type = InpcActionTypes.CreateInpcSuccess;
  constructor(public payload: { inpc: Inpc }) {}
}
// Update
export class UpdateInpc implements Action {
  readonly type = InpcActionTypes.UpdateInpc;
  constructor(public payload: { inpc: Update<Inpc> }) {}
}
export class UpdateInpcFail implements Action {
  readonly type = InpcActionTypes.UpdateInpcFail;
  constructor(public payload: { response: any }) {}
}
export class UpdateInpcSuccess implements Action {
  readonly type = InpcActionTypes.UpdateInpcSuccess;
  constructor(public payload: { inpc: Inpc }) {}
}

// Delete
export class DeleteInpc implements Action {
  readonly type = InpcActionTypes.DeleteInpc;
  constructor(public payload: { id: number }) {}
}
export class DeleteInpcFail implements Action {
  readonly type = InpcActionTypes.DeleteInpcFail;
  constructor(public payload: { response: any }) {}
}
export class DeleteInpcSuccess implements Action {
  readonly type = InpcActionTypes.DeleteInpcSuccess;
  constructor(public payload: { id: number }) {}
}

export type InpcActions =
  | LoadInpcs
  | LoadInpcsFail
  | LoadInpcsSuccess
  | CreateInpc
  | CreateInpcFail
  | CreateInpcSuccess
  | UpdateInpc
  | UpdateInpcFail
  | UpdateInpcSuccess
  | DeleteInpc
  | DeleteInpcFail
  | DeleteInpcSuccess;
