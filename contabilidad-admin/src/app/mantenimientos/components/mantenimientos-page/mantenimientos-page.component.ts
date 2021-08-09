import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'sx-mantenimientos-page',
  template: `
  <td-layout-nav-list
  #navList
  [opened]="media.registerQuery('gt-sm') | async"
  [mode]="(media.registerQuery('gt-sm') | async) ? 'side' : 'over'"
  [sidenavWidth]="(media.registerQuery('gt-xs') | async) ? '275px' : '100%'"
  >
  <div td-sidenav-toolbar-content layout="row" layout-align="start center">
    <button mat-icon-button tdLayoutToggle><mat-icon>menu</mat-icon></button>
    <span [routerLink]="['/']" class="cursor-pointer">SX CONTABILIDAD</span>
  </div>
  <div td-toolbar-content layout="row" layout-align="start center" flex>
    <button mat-icon-button tdLayoutNavListOpen [hideWhenOpened]="true">
      <mat-icon>arrow_back</mat-icon>
    </button>
    <span tdLayoutNavListToggle class="cursor-pointer">
      <span>Mantenimientos a operaciones</span>
    </span>
    <span flex></span>
  </div>

  <mat-nav-list
    dense
    td-sidenav-content
    [tdLayoutNavListClose]="!media.query('gt-sm')"
  >
    <ng-template let-item let-last="last" ngFor [ngForOf]="navmenu">
      <a mat-list-item [routerLink]="[item.route]"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{exact:true}">
        <mat-icon matListAvatar>{{ item.icon }}</mat-icon>
        <h3 matLine>{{ item.title }}</h3>
        <p matLine>{{ item.description }}</p>
      </a>
      <mat-divider [inset]="true" *ngIf="!last"></mat-divider>
    </ng-template>
    <mat-divider></mat-divider>

    <h3 matSubheader>Activo Fijo</h3>
    <ng-template let-item let-last="last" ngFor [ngForOf]="activo">
      <a mat-list-item [routerLink]="[item.route]"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{exact:true}">
        <mat-icon matListAvatar>{{ item.icon }}</mat-icon>
        <h3 matLine>{{ item.title }}</h3>
        <p matLine>{{ item.description }}</p>
      </a>
      <mat-divider [inset]="true" *ngIf="!last"></mat-divider>
    </ng-template>
    <mat-divider></mat-divider>

  </mat-nav-list>

  <router-outlet></router-outlet>
  <td-layout-footer> <sx-footer></sx-footer> </td-layout-footer>
</td-layout-nav-list>

  `,
  styles: []
})
export class MantenimientosPageComponent implements OnInit {
  navmenu: Object[] = [
    {
      route: 'fichas',
      title: 'Fichas',
      description: 'Ajuste de fichas',
      icon: 'storage'
    },
    {
      route: 'comisiones',
      title: 'Comisiones',
      description: 'Ajustes a comisiones de tarjeta',
      icon: 'build'
    },
    {
      route: 'cheques',
      title: 'Cheques',
      description: 'Registro de Cheques en Transito',
      icon: 'receipt'
    }
  ];

  activo: Object[] = [
    {
      icon: 'business',
      route: 'activos',
      title: 'Activos',
      description: 'Registro de activos'
    },
    {
      icon: 'thumb_down',
      route: 'activos/bajas',
      title: 'Bajas AF',
      description: 'Venta de activo fijo'
    },
    {
      icon: 'library_books',
      route: 'activos/resumen',
      title: 'Resumen',
      description: 'Analisis de depreciaciones'
    },
    {
      icon: 'question_answer',
      route: 'inpcs',
      title: 'INPCs',
      description: 'INPCs Mensuales'
    }
  ];

  constructor(public media: TdMediaService) {}

  ngOnInit() {
    console.log('Cargando modulo....');
  }
}
