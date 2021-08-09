import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Periodo } from '../../../_core/models/periodo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sx-periodo-dialog',
  template: `
  <h2 mat-dialog-title>{{title}}</h2>
  <mat-dialog-content>
  <form [formGroup]="form">
    <mat-form-field >
      <input matInput [matDatepicker]="myDatepicker" placeholder="Fecha inicial" formControlName="fechaInicial">
      <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
      <mat-datepicker #myDatepicker></mat-datepicker>
    </mat-form-field>
    <mat-form-field >
      <input matInput [matDatepicker]="myDatepicker2" placeholder="Fecha final" formControlName="fechaFinal">
      <mat-datepicker-toggle matSuffix [for]="myDatepicker2"></mat-datepicker-toggle>
      <mat-datepicker #myDatepicker2></mat-datepicker>
    </mat-form-field>
  </form>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Canelar</button>
    <button mat-button [mat-dialog-close]="getPeriodo()" [disabled]="form.invalid">Aceptar</button>
  </mat-dialog-actions>
`
})
export class PeriodoDialogComponent implements OnInit {
  periodo: Periodo;
  form: FormGroup;
  title;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.title = data.title || 'Seleccione un periodo';
    this.periodo = data.periodo || new Periodo();
    this.buildForm();
    this.form.setValue(this.periodo);
  }

  buildForm() {
    this.form = this.fb.group({
      fechaInicial: [new Date().toISOString(), Validators.required],
      fechaFinal: [new Date().toISOString(), Validators.required]
    });
  }

  getPeriodo() {
    if (this.form.valid) {
      const fechaInicial = this.form.get('fechaInicial').value as Date;
      const fechaFinal = this.form.get('fechaFinal').value as Date;
      return new Periodo(fechaInicial, fechaFinal);
    }
    return null;
  }

  ngOnInit() {}
}
