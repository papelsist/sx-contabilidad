import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CuentaContable } from 'app/cuentas/models';

@Component({
  selector: 'sx-reclasificar-modal',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="doAccept()">
      <h4 mat-dialog-title>
        Reclasificar Cuenta:
      </h4>
      <mat-divider></mat-divider>
      <mat-dialog-content>
      <div layout="column" class="selector-form">
        <div >
          <p>
            {{clave}} {{descripcion}}
          </p>
        </div>
        <sx-cuenta-contable-field placeholder="Cuenta nueva" [detalle]="true" formControlName="cuentaDestino"></sx-cuenta-contable-field>
      </div>
      </mat-dialog-content>

      <mat-dialog-actions>
        <button mat-button class="accent" type="submit" [disabled]="form.invalid">Aceptar</button>
        <button mat-button type="button" (click)="close()">Cancelar</button>
      </mat-dialog-actions>

    </form>

  `
})
export class ReclasificarModalComponent implements OnInit {
  form: FormGroup;
  clave: string;
  descripcion: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReclasificarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clave = data.clave;
    this.descripcion = data.descripcion;
  }

  ngOnInit() {
    this.form = this.fb.group({
      cuentaDestino: [null, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.form.valid) {
      const cuenta: CuentaContable = this.form.get('cuentaDestino').value;
      const { id, clave, descripcion } = cuenta;
      this.dialogRef.close({ id, clave, descripcion });
    }
  }
}
