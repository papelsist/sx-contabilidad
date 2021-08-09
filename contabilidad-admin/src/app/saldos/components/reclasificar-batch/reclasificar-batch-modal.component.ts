import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CuentaContable } from 'app/cuentas/models';

@Component({
  selector: 'sx-reclasificar-batch-modal',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="doAccept()">
      <h4 mat-dialog-title>
        Reclasificación de movimientos:
      </h4>
      <mat-divider></mat-divider>
      <mat-dialog-content>
      <div layout="column" class="selector-form">
        <div >
          <p>
            REGISTROS A RECLASIFICAR: {{partidas.length}}
          </p>
        </div>
        <sx-cuenta-contable-field placeholder="Cuenta nueva" [detalle]="true" formControlName="destino"></sx-cuenta-contable-field>
      </div>
      </mat-dialog-content>

      <mat-dialog-actions>
        <button mat-button type="button" (click)="close()">CANCELAR</button>
        <button mat-button class="accent" type="submit" [disabled]="form.invalid">RECLASIFICAR</button>
      </mat-dialog-actions>

    </form>
  `
})
export class ReclasificarBatchModalComponent implements OnInit {
  form: FormGroup;
  partidas: any[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReclasificarBatchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.partidas = data.partidas;
  }

  ngOnInit() {
    this.form = this.fb.group({
      destino: [null, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.form.valid) {
      const destino: CuentaContable = this.form.get('destino').value.id;
      const partidas = this.partidas.map(item => item.id);
      this.dialogRef.close({ destino, partidas });
    }
  }
}
