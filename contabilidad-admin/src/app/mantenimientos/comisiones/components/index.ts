import { AplicacionesPageComponent } from './aplicaciones-page/aplicaciones-page.component';
import { AplicacionesTableComponent } from './aplicaciones-table/aplicaciones-table.component';
import { AplicacionFormComponent } from './aplicacion-form/aplicacion-form.component';

export const components: any[] = [
  AplicacionesPageComponent,
  AplicacionesTableComponent
];

export const entryComponents: any[] = [AplicacionFormComponent];

export * from './aplicaciones-page/aplicaciones-page.component';
export * from './aplicaciones-table/aplicaciones-table.component';
export * from './aplicacion-form/aplicacion-form.component';
