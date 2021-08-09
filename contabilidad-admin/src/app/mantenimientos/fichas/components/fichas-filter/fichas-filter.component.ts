import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  Inject
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material';

import * as _ from 'lodash';

import { FichaFilter } from '../../models/ficha';
import { Cartera } from 'app/models';

@Component({
  selector: 'sx-fichas-filter',
  template: `
  <form [formGroup]="form">
    <h2 mat-dialog-title>{{title}}</h2>
    <mat-dialog-content>
      <div layout="column" class="pad-top">
        <mat-form-field flex >
          <mat-select placeholder="Cartera" formControlName="tipo" >
            <mat-option *ngFor="let cartera of carteras"
                [value]="cartera.clave">{{ cartera.descripcion}}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field flex >
          <input matInput [matDatepicker]="myDatepicker" placeholder="Fecha" formControlName="fecha" autocomplete="off">
          <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
          <mat-datepicker #myDatepicker></mat-datepicker>
        </mat-form-field>
        <sx-sucursal-field [parent]="form" ></sx-sucursal-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="form.value" [disabled]="form.invalid">Aceptar</button>
      <button mat-button mat-dialog-close>Canelar</button>
    </mat-dialog-actions>
  </form>
  `
})
export class FichasFilterComponent implements OnInit {
  title: string;
  filter: FichaFilter;

  form: FormGroup;

  carteras: Cartera[] = [
    { clave: 'CON', descripcion: 'CONTADO' },
    // { clave: 'COD', descripcion: 'CONTRA ENTREGA (COD)' },
    { clave: 'CRE', descripcion: 'CREDITO' },
    { clave: 'JUR', descripcion: 'JURIDICO' },
    { clave: 'CHE', descripcion: 'CHEQUE_DEVUELTO' }
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title || 'Filtro de fichas';
    this.filter = data.filter;
  }

  ngOnInit() {
    this.buildForm();
    this.form.patchValue(this.filter);
  }

  buildForm() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      tipo: [this.carteras[0], Validators.required],
      sucursal: [null]
    });
  }
  
}
