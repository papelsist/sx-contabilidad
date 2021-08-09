export interface BajaDeActivo {
  id: number;
  fecha: string;
  comentario: string;
  facturaSerie: string;
  facturaFolio: string;
  fechaFactura: string;
  importeDeVenta: number;
  moiContable: number;
  depreciacionContable: number;
  remanenteContable: number;
  utilidadContable: number;
  inpcMedioUso: number;
  inpc: number;
  factor: number;
  moiFiscal: number;
  depreciacionFiscalAcunulada: number;
  depreciacionFiscalEjercicioAnterior: number;
  depreciacionFiscalEjercicio: number;
  depreciacionFiscalEjercicioActualizada: number;
  costoFiscal: number;
  costoFiscalActualizado: number;
  utilidadFiscal: number;
  dateCreated: string;
  lastUpdated: string;
  createUser: string;
  updateUser: string;
}
