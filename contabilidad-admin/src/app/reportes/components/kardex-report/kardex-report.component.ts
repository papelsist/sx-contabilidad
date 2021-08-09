import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Periodo } from '../../../_core/models/periodo';

@Component({
  selector: 'sx-kardex-report',
  template: `
  <h2 mat-dialog-title>{{title}}</h2>
  <mat-dialog-content>
  <form [formGroup]="form">
    <sx-producto-field formControlName="producto"></sx-producto-field>
    <sx-sucursal-field [parent]="form"></sx-sucursal-field>
    <div layout>
      <mat-form-field flex>
        <input matInput [matDatepicker]="myDatepicker" placeholder="Fecha inicial" formControlName="fechaInicial">
        <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
        <mat-datepicker #myDatepicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field flex class="pad-left">
        <input matInput [matDatepicker]="myDatepicker2" placeholder="Fecha final" formControlName="fechaFinal">
        <mat-datepicker-toggle matSuffix [for]="myDatepicker2"></mat-datepicker-toggle>
        <mat-datepicker #myDatepicker2></mat-datepicker>
      </mat-form-field>
    </div>
  </form>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Canelar</button>
    <button mat-button [mat-dialog-close]="getData()" [disabled]="form.invalid">Aceptar</button>
  </mat-dialog-actions>
`
})
export class KardexReportComponent implements OnInit {
  periodo: Periodo;
  form: FormGroup;
  title;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.title = data.title || 'Kardex de producto';
    this.periodo = data.periodo || Periodo.mesActual();
    this.buildForm();
    const { fechaInicial, fechaFinal } = this.periodo;
    this.form.patchValue({ fechaInicial, fechaFinal });
  }

  buildForm() {
    this.form = this.fb.group({
      fechaInicial: [this.periodo.fechaInicial, [Validators.required]],
      fechaFinal: [this.periodo.fechaFinal, [Validators.required]],
      producto: [null, [Validators.required]],
      sucursal: [null, [Validators.required]]
    });
  }

  getData() {
    if (this.form.valid) {
      const fechaInicial: Date = this.form.get('fechaInicial').value;
      const fechaFinal: Date = this.form.get('fechaFinal').value;
      const producto = this.form.get('producto').value;
      return {
        ...this.form.value,
        fechaInicial: fechaInicial.toISOString(),
        fechaFinal: fechaFinal.toISOString(),
        producto: producto.id
      };
    }
    return null;
  }

  ngOnInit() {}
}
