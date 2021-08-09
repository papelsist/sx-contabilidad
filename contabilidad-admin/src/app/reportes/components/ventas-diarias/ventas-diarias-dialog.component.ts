import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'sx-ventas-diarias-dialog',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="doAccept()">
      <h4 mat-dialog-title>
        {{title}}
      </h4>
      <div layout="column" class="selector-form">

        <mat-form-field flex>
          <input matInput [matDatepicker]="picker" placeholder="Fecha" formControlName="fecha">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <sx-sucursal-field [parent]="form"></sx-sucursal-field>
        <mat-form-field>
          <mat-select placeholder="Tipo" formControlName="origen">
            <mat-option *ngFor="let tipo of carteras" [value]="tipo">
              {{tipo}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <mat-dialog-actions>
        <button mat-button class="accent" type="submit" [disabled]="form.invalid">Aceptar</button>
        <button mat-button type="button" (click)="close()">Cancelar</button>
      </mat-dialog-actions>

    </form>

  `
})
export class VentasDiariasDialogComponent implements OnInit {
  form: FormGroup;
  title: string;
  carteras: string[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VentasDiariasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title || 'Reporte de ventas diarias';
    this.carteras = data.carteras || [
      'CRE',
      'CON',
      'COD',
      'CHE',
      'JUR',
      'TODAS'
    ];
  }

  ngOnInit() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      sucursal: [null, Validators.required],
      origen: ['CRE', Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fecha: Date = this.form.get('fecha').value;
    const res = {
      fecha: moment(fecha).format('DD/MM/YYYY'),
      sucursal: this.form.get('sucursal').value,
      origen: this.form.get('origen').value
    };
    if (res.origen === 'TODAS') {
      res.origen = '%';
    }
    this.dialogRef.close(res);
  }
}
