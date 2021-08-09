import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";

import { Store, select } from "@ngrx/store";
import * as fromRoot from "app/store";
import * as fromStore from "../../store";

import { Observable } from "rxjs";

import { Catalogo } from "../../models";
import { MatDialog } from "@angular/material";

@Component({
  selector: "sx-catalogo-item",
  template: `
    <mat-card >
      <div class="title" *ngIf="catalogo$ | async as catalogo">
        <h2>
          Catálogo de Cuentas {{catalogo.emisor}}
        </h2>
        <span>
          Contabilidad electrónica
        </span>
        <span>
          <span> Ejercicio: <strong> {{catalogo.ejercicio}} </strong></span>
          <span> Mes: <strong> {{catalogo.mes}} </strong></span>
        </span>

      </div>

      <mat-divider></mat-divider>
      <div *ngIf="catalogo$ | async as catalogo" class="info-panel">
        <span>Creado por: </span>
        <mat-label>{{catalogo.createUser}}</mat-label>
        <mat-label> ({{catalogo.dateCreated | date: 'dd/MM/yyyy HH:mm'}})</mat-label>
        <div class="totales">
          <span>Total de cuentas: </span>
          <mat-label>{{catalogo?.cuentas?.length}}</mat-label>
        </div>


      </div>
      <div class="partidas">
        <sx-econta-cuentas-table [rows]="(catalogo$ | async)?.cuentas" #table></sx-econta-cuentas-table>
      </div>

      <mat-card-actions *ngIf="catalogo$ | async as catalogo">
        <button mat-button (click)="toCatalogos()">
          <mat-icon>arrow_back</mat-icon>
          <mat-label>Regresar</mat-label>
        </button>
        <sx-econta-item-buttons [documento]="catalogo" tipo="CATALOGO" ></sx-econta-item-buttons>
        <button mat-button color="primary" matTooltip="Exportar a CVS" (click)="table.exportData()">
          <mat-icon>send</mat-icon>
          <mat-label>CSV</mat-label>
        </button>
      </mat-card-actions>


    </mat-card>

  `,
  styleUrls: ["./catalogo-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogoItemComponent implements OnInit {
  catalogo$: Observable<Catalogo>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getCatalogosLoading));
    this.catalogo$ = this.store.pipe(select(fromStore.getSelectedCatalogo));
    // this.catalogo$.subscribe(cts => console.log("Cuenta: ", cts.cuentas));
  }

  onSelect(event: Catalogo) {
    this.store.dispatch(
      new fromRoot.Go({ path: ["econta", "catalogos", event.id] })
    );
  }

  onDownload(event: Catalogo) {
    this.store.dispatch(
      new fromStore.DescargarCatalogoXml({ catalogo: event })
    );
  }

  toCatalogos() {
    this.store.dispatch(new fromRoot.Go({ path: ["econta", "catalogos"] }));
  }

  showXml(catalogo: Catalogo) {}
}
