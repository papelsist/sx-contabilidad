import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// import { CobroCheque } from '../../models';
import * as _ from 'lodash';
import { FichasSupportService } from '../../services/fichas-support.service';

@Component({
  selector: 'sx-ficha-info',
  template: `
  <h2 mat-dialog-title>Detalle de ficha : {{ficha.folio}} {{ficha.tipoDeFicha}}</h2>
  <mat-dialog-content class="mat-elevation-z3">
    <table mat-table [dataSource]="cheques" >
      <ng-container matColumnDef="{{column.name}}" *ngFor="let column of columns">
        <th mat-header-cell *matHeaderCellDef> {{column.label}} </th>
        <td mat-cell *matCellDef="let element">
          <span *ngIf="column?.format === 'currency'; else normal">
            {{element[column.name] | currency}}
          </span>
          <ng-template #normal>
            {{element[column.name]}}
          </ng-template>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
      <tr mat-row *matRowDef="let element; columns: columnsToDisplay;"></tr>
    </table>
  </mat-dialog-content>

  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Cerrar</button>
    <span flex></span>
    <span>Total: </span>
    <span class="pad-left pad-right">{{getTotal() | currency}}</span>

  </mat-dialog-actions>
  `,
  styles: [
    `
      table {
        width: 100%;
        max-height: 700px;
        overflow: auto;
      }
      .mat-column-tipo {
        width: 50px;
      }
      .mat-column-nombre {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .mat-column-banco {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .mat-cell {
        font-size: 11px;
      }
      .mat-row {
        height: 30px;
      }
    `
  ]
})
export class FichaInfoComponent implements OnInit {
  ficha;
  cheques: any[] = [];
  columns = [
    { name: 'banco', label: 'Banco' },
    { name: 'numero', label: 'Número' },
    { name: 'nombre', label: 'Nombre' },
    { name: 'importe', label: 'Importe', format: 'currency' }
  ];
  columnsToDisplay;

  constructor(
    public dialogRef: MatDialogRef<FichaInfoComponent>,
    private service: FichasSupportService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ficha = data.ficha;
  }

  ngOnInit() {
    this.columnsToDisplay = this.columns.map(item => item.name);
    this.service.cheques(this.ficha.id).subscribe(res => {
      this.cheques = res;
    });
  }

  getTotal() {
    return _.sumBy(this.cheques, 'importe');
  }
}
