import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EjercicioMes } from '../../../models/ejercicio-mes';

@Component({
  selector: 'sx-ejercicio-mes-dialog',
  template: `
  <h2 mat-dialog-title>{{title}}</h2>
  <mat-dialog-content>
  <form [formGroup]="form">
    <sx-ejercicio-field [parent]="form"></sx-ejercicio-field>
    <sx-mes-field [parent]="form"></sx-mes-field>
  </form>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Canelar</button>
    <button mat-button (click)="closeDialog()" [disabled]="form.invalid">Aceptar</button>
  </mat-dialog-actions>
`
})
export class EjercicioMesDialogComponent implements OnInit {
  periodo: EjercicioMes;
  form: FormGroup;
  title;

  constructor(
    public dialogRef: MatDialogRef<EjercicioMesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.title = data.title || 'Cambiar  periodo';
    this.periodo = data.periodo;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      ejercicio: [this.periodo.ejercicio, Validators.required],
      mes: [this.periodo.mes, Validators.required]
    });
  }

  closeDialog() {
    this.dialogRef.close(this.getPeriodo());
  }

  getPeriodo() {
    return {
      ejercicio: this.form.get('ejercicio').value,
      mes: this.form.get('mes').value
    };
  }
}
