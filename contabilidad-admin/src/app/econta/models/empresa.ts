export interface Empresa {
  id?: string;
  clave: string;
  razonSocial: string;
  rfc: string;
  dataBaseUrl: string;
  sqlCatalogo: string;
  sqlBalanza: string;
  sqlAuxiliarCuentas?: string;
  sqlAuxiliarFolios?: string;
  dateCreated?: string;
  lastUpdated?: string;
}

export type EcontaTipo = "CATALOGO" | "BALANZA";
