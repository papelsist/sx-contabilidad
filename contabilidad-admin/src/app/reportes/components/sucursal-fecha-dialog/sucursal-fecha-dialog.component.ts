import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'sx-sucursal-fecha',
  template: `
  <form [formGroup]="form" novalidate (ngSubmit)="doAccept()">
    <h4 md-dialog-title>
      {{title}}
    </h4>

    <div layout="column" class="selector-form">

      <mat-form-field flex>
        <input matInput [matDatepicker]="picker" placeholder="Fecha" formControlName="fecha">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <sx-sucursal-field [parent]="form"></sx-sucursal-field>

    </div>

    <mat-dialog-actions>
      <button mat-button class="accent" type="submit" [disabled]="form.invalid">Aceptar</button>
      <button mat-button type="button" (click)="close()">Cancelar</button>
    </mat-dialog-actions>

  </form>

  `
})
export class SucursalFechaDialogComponent implements OnInit {
  form: FormGroup;
  title;
  sucursalOpcional: boolean;
  storKey: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SucursalFechaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title || 'Seleccione periodo y sucursal';
    this.sucursalOpcional = data.sucursalOpcional || false;
    this.storKey = data.storKey || 'sx.reports.sucursal-dialog-last';
  }

  ngOnInit() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      sucursal: [null]
    });
    if (!this.sucursalOpcional) {
      this.form.get('sucursal').setValidators([Validators.required]);
    }
    this.readFromStorage();
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fecha: Date = this.form.get('fecha').value;
    const res = {
      fecha: fecha.toISOString(),
      sucursal: this.form.get('sucursal').value
    };
    this.store();
    this.dialogRef.close(res);
  }

  readFromStorage() {
    const value = JSON.parse(localStorage.getItem(this.storKey)) || {};
    if (value.fecha) {
      value.fecha = moment(value.fecha).toDate();
    }
    this.form.patchValue(value);
  }

  store() {
    localStorage.setItem(this.storKey, JSON.stringify(this.form.value));
  }
}
