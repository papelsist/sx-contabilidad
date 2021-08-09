export interface CorteDeTarjetaAplicacion {
  id: string;
  importe: number;
  tipo: string;
  sucursal: string;
  folio: number;
  fecha: string;
  fechaDeposito?: Date;
}
