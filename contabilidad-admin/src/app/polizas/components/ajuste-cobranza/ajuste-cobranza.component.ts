import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { PolizaDet } from 'app/polizas/models';

@Component({
  selector: 'sx-ajuste-cobranza',
  template: `
    <h2 mat-dialog-title> Ajuste de cobranza:
    </h2>
    <mat-dialog-content>
      <p>Datos generales para realizar el ajuste (PENDIENTE)</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
`,
  styles: [``]
})
export class AjusteCobranzaComponent implements OnInit {
  polizaDet: PolizaDet;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.polizaDet = data.polizaDet;
  }

  ngOnInit() {}
}
