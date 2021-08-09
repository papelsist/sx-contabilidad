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

import { Balanza } from "../../models";

@Component({
  selector: "sx-balanza-sat-item",
  template: `
    <mat-card *ngIf="balanza$ | async as balanza">
      <div class="title" >
        <h2>
          Balanza SAT {{balanza.emisor}}
        </h2>
        <span>
          Contabilidad electrónica
        </span>
        <span>
          <span> Ejercicio: <strong> {{balanza.ejercicio}} </strong></span>
          <span> Mes: <strong> {{balanza.mes}} </strong></span>
        </span>

      </div>

      <mat-divider></mat-divider>
      <div  class="info-panel">
        <span>Tipo: </span>
        <mat-label>{{balanza.tipo }}</mat-label>
        <span>Creado por: </span>
        <mat-label>{{balanza.createUser}}</mat-label>
        <mat-label> ({{balanza.dateCreated | date: 'dd/MM/yyyy HH:mm'}})</mat-label>

      </div>
      <div class="partidas">
        <sx-econa-balanza-items-table [rows]="balanza.partidas" #table>  </sx-econa-balanza-items-table>
      </div>

      <mat-card-actions>
        <button mat-button (click)="toBalanzas()">
          <mat-icon>arrow_back</mat-icon>
          <mat-label>Regresar</mat-label>
        </button>
        <sx-econta-item-buttons [documento]="balanza" tipo="BALANZA" ></sx-econta-item-buttons>
        <button mat-button color="primary" matTooltip="Exportar a CVS" (click)="table.exportData()">
          <mat-icon>send</mat-icon>
          <mat-label>CSV</mat-label>
        </button>
      </mat-card-actions>


    </mat-card>

  `,
  styleUrls: ["./balanza-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanzaItemComponent implements OnInit {
  balanza$: Observable<Balanza>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getBalanzasLoading));
    this.balanza$ = this.store.pipe(select(fromStore.getSelectedBalanza));
    this.balanza$.subscribe(val => console.log(val));
  }

  toBalanzas() {
    this.store.dispatch(new fromRoot.Go({ path: ["econta", "balanzas"] }));
  }
}
