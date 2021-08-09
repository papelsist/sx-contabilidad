import { CatalogosGuard } from "./catalogos.guard";
import { CatalogoExistsGuard } from "./catalogo-exists.guard";
import { BalanzasGuard } from "./balanzas.guard";
import { PolizasPeriodoGuard } from "./polizas-periodo.guard";
import { BalanzaExistsGuard } from "./balanza-exists.guard";

export const guards: any[] = [
  CatalogosGuard,
  CatalogoExistsGuard,
  BalanzasGuard,
  BalanzaExistsGuard,
  PolizasPeriodoGuard
];

export * from "./catalogos.guard";
export * from "./catalogo-exists.guard";
export * from "./balanzas.guard";
export * from "./balanza-exists.guard";
export * from "./polizas-periodo.guard";
