import { EcontaService } from "./econta.service";
import { CatalogoService } from "./catalogo.service";
import { EmpresasService } from "./empresas.service";
import { BalanzaService } from "./balanza.service";
import { PolizasPeriodoService } from "./polizas-periodo.service";

export const services: any[] = [
  EcontaService,
  CatalogoService,
  BalanzaService,
  PolizasPeriodoService,
  EmpresasService
];
export * from "./econta.service";
export * from "./catalogo.service";
export * from "./balanza.service";
export * from "./polizas-periodo.service";
export * from "./empresas.service";
