import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import * as fromContainers from "./containers";
import * as fromGuards from "./guards";

const routes: Routes = [
  {
    path: "",
    component: fromContainers.EcontaPageComponent,
    children: [
      {
        path: "catalogos",
        canActivate: [fromGuards.CatalogosGuard],
        component: fromContainers.CatalogosComponent
      },
      {
        path: "catalogos/:id",
        canActivate: [fromGuards.CatalogoExistsGuard],
        component: fromContainers.CatalogoItemComponent
      },
      {
        path: "balanzas",
        canActivate: [fromGuards.BalanzasGuard],
        component: fromContainers.BalanzasComponent
      },
      {
        path: "balanzas/:id",
        canActivate: [fromGuards.BalanzaExistsGuard],
        component: fromContainers.BalanzaItemComponent
      },
      {
        path: "polizas",
        canActivate: [fromGuards.PolizasPeriodoGuard],
        component: fromContainers.PolizasPeriodoComponent
      },
      {
        path: "empresas",
        component: fromContainers.EmpresasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcontaRoutingModule {}
