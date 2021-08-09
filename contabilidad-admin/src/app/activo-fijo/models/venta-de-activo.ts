export interface VentaDeActivo {
  id: number;
  fecha: string;
  depreciacionAcumulada: number;
  remanente: number;
  comentario?: string;
  facturaSerie?: string;
  facturaFolio?: string;
  fechaFactura?: string;
  importeDeVenta?: number;
  dateCreated: string;
  lastUpdated: string;
  createUser: string;
  updateUser: string;
}
