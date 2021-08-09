import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sx-costo-producto',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="doAccept()">
      <h4 md-dialog-title>
        <span layout class="pad-left">
          <span>Calcular costo por producto</span>
          <span flex></span>
          <span>Ejercicio: {{periodo.ejercicio}}</span>
          <span class="pad-left">Mes: {{periodo.mes}}</span>
        </span>
      </h4>
      <mat-dialog-content>
        <sx-producto-field formControlName="producto"></sx-producto-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button class="accent" type="submit" [disabled]="form.invalid">Aceptar</button>
        <button mat-button type="button" (click)="close()">Cancelar</button>
      </mat-dialog-actions>

    </form>
  `,
  styles: []
})
export class CostoProductoDialogComponent implements OnInit {
  form: FormGroup;
  periodo: { ejercicio: number; mes: number };

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CostoProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.periodo = data.periodo;
  }

  ngOnInit() {
    this.form = this.fb.group({
      producto: [null, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.get('producto').value.id);
    }
  }
}
