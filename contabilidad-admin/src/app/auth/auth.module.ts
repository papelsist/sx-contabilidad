import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../_shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from './store/reducers';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { AuthEffects } from './store/effects/auth.effects';

import { TokenInterceptor } from './services/token.interceptor';
import { UnautorizedInterceptor } from './services/unauthorized.interceptor';

import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [SharedModule],
  declarations: [...containers, ...components],
  exports: [...components]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [
        AuthService,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UnautorizedInterceptor,
          multi: true
        }
      ]
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class RootAuthModule {}
