import { EcontaPageComponent } from "./econta-page/econta-page.component";
import { CatalogosComponent } from "./catalogos/catalogos.component";
import { BalanzasComponent } from "./balanzas/balanzas.component";
import { PolizasPeriodoComponent } from "./polizas-periodo/polizas-periodo.component";
import { CatalogoItemComponent } from "./catalogo-item/catalogo-item.component";
import { EmpresasComponent } from "./empresas/empresas.component";
import { BalanzaItemComponent } from "./balanza-item/balanza-item.component";

export const containers: any[] = [
  EcontaPageComponent,
  CatalogosComponent,
  CatalogoItemComponent,
  BalanzasComponent,
  PolizasPeriodoComponent,
  EmpresasComponent,
  BalanzaItemComponent
];

export * from "./econta-page/econta-page.component";
export * from "./catalogos/catalogos.component";
export * from "./catalogo-item/catalogo-item.component";
export * from "./balanzas/balanzas.component";
export * from "./polizas-periodo/polizas-periodo.component";
export * from "./empresas/empresas.component";
export * from "./balanza-item/balanza-item.component";
