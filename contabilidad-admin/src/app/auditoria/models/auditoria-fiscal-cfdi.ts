export interface AuditoriaFiscalCfdi {
  id: number;
  ejercicio: number;
  mes: number;
  tipo: string;
  estatus: string;
  registrosSx: number;
  registrosSat: number;
  diferencia: number;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
}
