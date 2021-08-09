import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sx-calculo-por-producto-dialog',
  template: `
  <h2 mat-dialog-title>{{title}}</h2>
  <mat-dialog-content>
  <form [formGroup]="form">
    <sx-ejercicio-field [parent]="form"></sx-ejercicio-field>
    <sx-mes-field [parent]="form"></sx-mes-field>
    <sx-producto-field [activos]="true" formControlName="producto"></sx-producto-field>
  </form>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Canelar</button>
    <button mat-button [mat-dialog-close]="getData()" [disabled]="form.invalid">Aceptar</button>
  </mat-dialog-actions>
`
})
export class CalculoPorProductoDialogComponent implements OnInit {
  periodo: { ejercicio: number; mes: number };
  form: FormGroup;
  title;
  productoRequerido = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.title = data.title || 'Seleccione un periodo';
    this.periodo = data.periodo || {
      ejercicio: new Date().getFullYear(),
      mes: new Date().getMonth()
    };
    this.productoRequerido = data.productoRequerido;
    console.log('Prd requerido: ', this.productoRequerido);
    console.log('Data: ', this.data);
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      ejercicio: [this.periodo.ejercicio, Validators.required],
      mes: [this.periodo.mes, Validators.required],
      producto: [null, this.productoRequerido ? [Validators.required] : []]
    });
  }

  getData() {
    if (this.form.valid) {
      const producto = this.form.get('producto').value;
      if (producto !== null) {
        return {
          ...this.form.value,
          producto: producto.clave
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
  }

  ngOnInit() {}
}
