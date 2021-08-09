import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import * as _ from 'lodash';

import { CorteDeTarjetaAplicacion } from '../../models';

@Component({
  selector: 'sx-aplicaion-form',
  template: `
  <form [formGroup]="form">
    <h2 mat-dialog-title>
      Ajuste de comisión de tarjeta
    </h2>
    <mat-divider></mat-divider>
    <mat-dialog-content>
      <div layout="column" class="pad-top">
        <div layout>
          <mat-form-field flex>
            <input matInput [value]="aplicacion.sucursal" placeholder="Sucursal" [disabled]="true">
          </mat-form-field>
          <mat-form-field flex class="pad-left">
            <input matInput [value]="aplicacion.folio" placeholder="Corte" [disabled]="true">
          </mat-form-field>
        </div>
        <div layout>
          <mat-form-field flex>
            <input matInput value="{{aplicacion.fecha | date: 'dd/MM/yyyy'}}"
              placeholder="Fecha" [disabled]="true">
          </mat-form-field>
          <mat-form-field flex class="pad-left">
            <input matInput formControlName="importe" placeholder="Importe" >
          </mat-form-field>
        </div>

      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="closeDialog()" [disabled]="form.invalid">Aceptar</button>
      <button mat-button mat-dialog-close>Canelar</button>
    </mat-dialog-actions>
  </form>
  `
})
export class AplicacionFormComponent implements OnInit {
  title: string;
  aplicacion: CorteDeTarjetaAplicacion;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AplicacionFormComponent>
  ) {
    this.aplicacion = data.aplicacion;
  }

  ngOnInit() {
    this.buildForm();
    this.form.patchValue(this.aplicacion);
  }

  buildForm() {
    this.form = this.fb.group({
      importe: [null, Validators.required]
    });
  }

  closeDialog() {
    if (this.form.valid) {
      const importe: number = this.form.get('importe').value;
      const command = { ...this.form.value, importe: Math.abs(importe) };
      this.dialogRef.close(command);
    }
  }
}
