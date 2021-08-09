import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects, CustomSerializer } from './store';

// Not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { AppRoutingModule } from './app-routing.module';
import { ConfigService } from './utils/config.service';
import { environment } from 'environments/environment.prod';

import { SharedModule } from './_shared/shared.module';
import { CoreModule } from './_core/core.module';
import { AuthModule } from './auth/auth.module';
import { CuentasModule } from './cuentas/cuentas.module';

import { AppComponent } from './app.component';

import { NgxMaskModule } from 'ngx-mask';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

export function onAppInit(configService: ConfigService): () => Promise<any> {
  return () => configService.load();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    // Ngrx Store configuration
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'SX-Contabilidad Dev Tools',
      logOnly: environment.production
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    AuthModule.forRoot(),
    CoreModule,
    CuentasModule.forRoot()
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit,
      multi: true,
      deps: [ConfigService]
    },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
