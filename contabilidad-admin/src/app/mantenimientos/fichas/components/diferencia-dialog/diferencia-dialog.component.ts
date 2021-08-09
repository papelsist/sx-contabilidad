import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import * as _ from 'lodash';

import { Ficha } from '../../models/ficha';

@Component({
  selector: 'sx-diferencias-dialog',
  template: `
  <form [formGroup]="form">
    <h2 mat-dialog-title>
      Ajuste de ficha
    </h2>
    <mat-divider></mat-divider>
    <mat-dialog-content>
      <div layout="column" class="pad-top">
        <div layout>
          <mat-form-field flex>
            <input matInput [value]="ficha.sucursal.nombre" placeholder="Sucursal" [disabled]="true">
          </mat-form-field>
          <mat-form-field flex class="pad-left">
            <input matInput [value]="ficha.folio" placeholder="Folio" [disabled]="true">
          </mat-form-field>
        </div>
        <div layout>
          <mat-form-field flex>
            <input matInput value="{{ficha.fecha | date: 'dd/MM/yyyy'}}"
              placeholder="Fecha" [disabled]="true">
          </mat-form-field>
          <mat-form-field flex class="pad-left">
            <input matInput value="{{ficha.total | currency}}" placeholder="Total" [disabled]="true">
          </mat-form-field>
        </div>
        <div layout>
          <mat-form-field flex>
            <input matInput placeholder="Diferencia" type="number"
              formControlName="diferencia" autocomplete="off"/>
          </mat-form-field>

          <mat-form-field flex class="pad-left">
            <mat-select placeholder="Tipo" formControlName="diferenciaTipo" >
              <mat-option *ngFor="let tipo of ['EN_VALORES','POR_COBRANZA']"
                  [value]="tipo">{{ tipo}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <sx-cajera-field formControlName="empleado" flex></sx-cajera-field>

      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="closeDialog()" [disabled]="form.invalid">Aceptar</button>
      <button mat-button mat-dialog-close>Canelar</button>
    </mat-dialog-actions>
  </form>
  `
})
export class DiferenciaDialogComponent implements OnInit {
  title: string;
  ficha: Ficha;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DiferenciaDialogComponent>
  ) {
    this.ficha = data.ficha;
  }

  ngOnInit() {
    this.buildForm();
    this.form.patchValue(this.ficha);
  }

  buildForm() {
    this.form = this.fb.group({
      diferencia: [0.0, Validators.required],
      diferenciaTipo: [null, Validators.required],
      empleado: [null]
    });
  }

  closeDialog() {
    if (this.form.valid) {
      const empleado = this.form.get('empleado').value;
      const command = { ...this.form.value };
      command.diferenciaUsuario = empleado.numeroDeTrabajador;
      this.dialogRef.close(command);
    }
  }
}
