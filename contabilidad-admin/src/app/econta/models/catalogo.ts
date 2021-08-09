import { EcontaDocument } from "./econta";

export interface Catalogo extends EcontaDocument {
  cuentas?: any[];
}
