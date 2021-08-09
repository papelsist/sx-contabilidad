import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sx-periodo-costos-dialog',
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
    <button mat-button [mat-dialog-close]="getPeriodo()" [disabled]="form.invalid">Aceptar</button>
  </mat-dialog-actions>
`
})
export class PeriodoCostosDialogComponent implements OnInit {
  periodo: {ejercicio: number, mes: number};
  form: FormGroup;
  title;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.title = data.title || 'Seleccione un periodo';
    this.periodo = data.periodo || {ejercicio: new Date().getFullYear(), mes: new Date().getMonth()};
    this.buildForm();
    this.form.setValue(this.periodo);
  }

  buildForm() {
    this.form = this.fb.group({
      ejercicio: [this.periodo.ejercicio, Validators.required],
      mes: [this.periodo.mes, Validators.required]
    });
  }

  getPeriodo() {
    if (this.form.valid) {
      return this.form.value;
    }
    return null;
  }

  ngOnInit() {}
}
