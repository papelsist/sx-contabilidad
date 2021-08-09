import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../_shared/shared.module';
import { MainPageComponent } from './containers/main-page/main-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { PagosUtils } from './services/pagos-utils.service';

import { components } from './components';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([]), AuthModule],
  declarations: [...components, MainPageComponent, HomePageComponent],
  exports: [...components],
  providers: [PagosUtils]
})
export class CoreModule {}
