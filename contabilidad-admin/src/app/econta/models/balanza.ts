import { EcontaDocument } from "./econta";

export interface Balanza extends EcontaDocument {
  tipo: "N" | "C";
  partidas: any[];
  ultimaModificacion: string;
}
