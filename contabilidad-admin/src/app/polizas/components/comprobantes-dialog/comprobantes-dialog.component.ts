import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Poliza } from 'app/polizas/models';

@Component({
  selector: 'sx-comprobantes-dialog',
  template: `
  <h2 mat-dialog-title>{{poliza.concepto}} Comprobantes: {{tipo}}
  </h2>
  <mat-dialog-content>
    <table mat-table [dataSource]="comprobantes" matSort >

      <ng-container matColumnDef="uuidcfdi">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>UUID</th>
        <td mat-cell *matCellDef="let row">{{ row.uuidcfdi }}</td>
      </ng-container>
      <ng-container matColumnDef="rfc">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>RFC</th>
        <td mat-cell *matCellDef="let row">{{ row.rfc }}</td>
      </ng-container>

      <ng-container matColumnDef="numFactExt">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>NumFactExt</th>
        <td mat-cell *matCellDef="let row">{{ row.numFactExt }}</td>
      </ng-container>

      <ng-container matColumnDef="taxID">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>TaxID</th>
        <td mat-cell *matCellDef="let row">{{ row.taxID }}</td>
      </ng-container>

      <ng-container matColumnDef="moneda">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Mon</th>
        <td mat-cell *matCellDef="let row">{{ row.moneda }}</td>
      </ng-container>
      <ng-container matColumnDef="tipCamb">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>TipCamb</th>
        <td mat-cell *matCellDef="let row">{{ row.tipCamb }}</td>
      </ng-container>

      <ng-container matColumnDef="montoTotal">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>MontoTotal</th>
        <td mat-cell *matCellDef="let row">{{ row.montoTotal }}</td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayColumns; sticky: true"></tr>
      <tr
        mat-row
        *matRowDef="let row; columns: displayColumns"
        class="cursor-pointer"></tr>
    </table>
  <!--
    <mat-paginator
      [pageSizeOptions]="[10, 20, 100, 500, 1000, 3000, 5000]"
      [pageSize]="20"
      showFirstLastButtons
    ></mat-paginator>
-->
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Cerrar</button>
  </mat-dialog-actions>
`,
  styles: [
    `
      table {
        width: 100%;
        max-height: 500px;
        overflow: auto;
      }
      .mat-cell {
        font-size: 11px;
      }
      .mat-row {
        height: 30px;
      }
      .mat-column-descripcion {
        max-width: 200px;
      }
      .mat-column-nivel {
        max-width: 90px;
      }
      .mat-column-tipo {
        max-width: 90px;
      }
    `
  ]
})
export class ComprobantesDialogComponent implements OnInit {
  poliza: Poliza;
  tipo = 'NACIONALES';
  comprobantes: any[] = [];
  displayColumns = ['uuidcfdi', 'rfc', 'montoTotal'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.poliza = data.poliza;
    this.tipo = data.tipo;
    if (this.tipo !== 'NACIONALES') {
      this.displayColumns = [
        'numFactExt',
        'taxID',
        'montoTotal',
        'moneda',
        'tipCamb'
      ];
    }
  }

  ngOnInit() {
    if (this.tipo === 'NACIONALES') {
      this.poliza.partidas
        .filter(item => item.nacionales.length > 0)
        .forEach(item => {
          this.comprobantes.push(...item.nacionales);
        });
    } else {
      this.poliza.partidas
        .filter(item => item.extranjeros.length > 0)
        .forEach(item => {
          this.comprobantes.push(...item.extranjeros);
        });
    }
  }
}
