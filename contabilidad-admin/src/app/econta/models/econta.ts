export interface EcontaDocument {
  id: string;
  ejercicio: number;
  mes: number;
  rfc: string;
  emisor: string;
  fileName?: string;
  xmlUrl?: string;
  acuseUrl?: string;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
}
