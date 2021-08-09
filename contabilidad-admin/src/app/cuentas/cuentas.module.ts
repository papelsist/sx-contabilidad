import { NgModule, ModuleWithProviders } from '@angular/core';

import { CuentasRoutingModule } from './cuentas-routing.module';
import { SharedModule } from '../_shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { services } from './services';
import { guards } from './guards';
import { components, entryComponents } from './components';
import { containers } from './containers';
import { AuthModule } from '../auth/auth.module';
import { ReportesModule } from '../reportes/reportes.module';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    SharedModule,
    CuentasRoutingModule,
    AuthModule,
    ReportesModule,
    NgxMaskModule.forChild()
  ],
  declarations: [...components, ...containers],
  entryComponents: [...entryComponents],
  exports: [...containers, ...components]
})
export class CuentasModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootCuentasModule,
      providers: [...services, ...guards]
    };
  }
}

@NgModule({
  imports: [
    CuentasModule,
    StoreModule.forFeature('cuentas', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class RootCuentasModule {}
