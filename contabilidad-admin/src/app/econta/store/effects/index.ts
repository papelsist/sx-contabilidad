import { CatalogosEffects } from "./catalogos.effects";
import { BalanzasEffects } from "./balanzas.effects";
import { PolizasPeriodoEffects } from "./polizas-periodo.effects";

export const effects: any[] = [
  CatalogosEffects,
  BalanzasEffects,
  PolizasPeriodoEffects
];

export * from "./catalogos.effects";
export * from "./balanzas.effects";
export * from "./polizas-periodo.effects";
