import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/ficha.reducer';
import { FichaEffects } from './store/fichas.effects';

import { FichasPageComponent } from './components/fichas-page/fichas-page.component';
import { RouterModule, Route } from '@angular/router';
import { FichasTableComponent } from './components/fichas-table/fichas-table.component';
import { FichasFilterComponent } from './components/fichas-filter/fichas-filter.component';
import { SharedModule } from 'app/_shared/shared.module';
import { FichasFilterBtnComponent } from './components/fichas-filter/fichas-filter-btn.component';
import { FichaInfoComponent } from './components/ficha-info/ficha.info.component';
import { DiferenciaDialogComponent } from './components/diferencia-dialog/diferencia-dialog.component';
import { FichasGuard } from './services/fichas.guard';
import { CajeraFieldComponent } from './cajera-field/cajera-field.component';

const routes: Route[] = [
  { path: '', component: FichasPageComponent, canActivate: [FichasGuard] }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('fichas', reducer),
    EffectsModule.forFeature([FichaEffects])
  ],
  declarations: [
    FichasPageComponent,
    FichasTableComponent,
    FichasFilterComponent,
    FichasFilterBtnComponent,
    FichaInfoComponent,
    DiferenciaDialogComponent,
    CajeraFieldComponent
  ],
  entryComponents: [
    FichasFilterComponent,
    FichaInfoComponent,
    DiferenciaDialogComponent
  ],
  providers: [FichasGuard]
})
export class FichasModule {}
