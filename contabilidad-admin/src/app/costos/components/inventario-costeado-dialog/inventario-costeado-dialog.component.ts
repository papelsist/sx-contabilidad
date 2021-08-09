import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sx-inventario-costeado-dialog',
  template: `
  <h2 mat-dialog-title>{{title}}</h2>
  <mat-dialog-content>
  <form [formGroup]="form">
    <sx-ejercicio-field [parent]="form"></sx-ejercicio-field>
    <sx-mes-field [parent]="form"></sx-mes-field>
    <sx-sucursal-field [parent]="form"></sx-sucursal-field>
  </form>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Canelar</button>
    <button mat-button [mat-dialog-close]="getData()" [disabled]="form.invalid">Aceptar</button>
  </mat-dialog-actions>
`
})
export class InventarioCosteadoDialogComponent implements OnInit {
  periodo: { ejercicio: number; mes: number };
  form: FormGroup;
  title;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.title = data.title || 'Seleccione un periodo';
    this.periodo = data.periodo || {
      ejercicio: new Date().getFullYear(),
      mes: new Date().getMonth()
    };
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      ejercicio: [this.periodo.ejercicio, Validators.required],
      mes: [this.periodo.mes, Validators.required],
      sucursal: []
    });
  }

  getData() {
    /*
    if (this.form.valid) {
      const sucursal = this.form.get('sucursal').value;
      console.log('Sucursal: ', sucursal);
      if (sucursal) {
        return {
          ...this.form.value,
          sucursal: sucursal
        };
      } else {
        const { ejercicio, mes } = this.form.value;
        return {
          ejercicio,
          mes
        };
      }
    }
    return null;
    */
    return this.form.value;
  }

  ngOnInit() {}
}
