import { Action } from '@ngrx/store';
import { SatMetadata } from 'app/auditoria/models';

export enum MetadataActionTypes {
  SetMetadataFilter = '[Metadata Page] Set metadata filter',
  LoadMetadata = '[Metadata Page] Load Metadata',
  LoadMetadataFail = '[Metadata API] Load Metadata fail',
  LoadMetadataSuccess = '[Metadata API] Load Metadata success',

  ImportarMetadata = '[Metadata Page] Importar Metadata',
  ImportarMetadataFail = '[Metadata API] Importar Metadata fail',
  ImportarMetadataSuccess = '[Metadata API] Importar Metadata success'
}

export class SetMetadataFilter implements Action {
  readonly type = MetadataActionTypes.SetMetadataFilter;
  constructor(public payload: { filter: any }) {}
}

export class LoadMetadata implements Action {
  readonly type = MetadataActionTypes.LoadMetadata;
  constructor(public payload: { filter: any }) {}
}
export class LoadMetadataFail implements Action {
  readonly type = MetadataActionTypes.LoadMetadataFail;
  constructor(public payload: { response: any }) {}
}
export class LoadMetadataSuccess implements Action {
  readonly type = MetadataActionTypes.LoadMetadataSuccess;
  constructor(public payload: { data: SatMetadata[] }) {}
}

export class ImportarMetadata implements Action {
  readonly type = MetadataActionTypes.ImportarMetadata;
  constructor(public payload: { filter: any }) {}
}
export class ImportarMetadataFail implements Action {
  readonly type = MetadataActionTypes.ImportarMetadataFail;
  constructor(public payload: { response: any }) {}
}
export class ImportarMetadataSuccess implements Action {
  readonly type = MetadataActionTypes.ImportarMetadataSuccess;
}

export type MetadataActions =
  | SetMetadataFilter
  | LoadMetadata
  | LoadMetadataFail
  | LoadMetadataSuccess
  | ImportarMetadata
  | ImportarMetadataFail
  | ImportarMetadataSuccess;
