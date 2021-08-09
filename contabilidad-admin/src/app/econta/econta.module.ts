import { NgModule } from "@angular/core";

import { EcontaRoutingModule } from "./econta-routing.module";
import { SharedModule } from "../_shared/shared.module";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers, effects } from "./store";

import { services } from "./services";
import { guards } from "./guards";
import { components, entryComponents } from "./components";
import { containers } from "./containers";
import { AuthModule } from "../auth/auth.module";
import { ReportesModule } from "../reportes/reportes.module";
import { AgGridModule } from "ag-grid-angular";

@NgModule({
  imports: [
    SharedModule,
    AgGridModule.withComponents([]),
    AuthModule,
    ReportesModule,
    EcontaRoutingModule,
    StoreModule.forFeature("econta", reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...components, ...containers],
  entryComponents: [...entryComponents],
  providers: [...services, ...guards],
  exports: [...containers, ...components]
})
export class EcontaModule {}
