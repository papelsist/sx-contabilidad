import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatalogoFilter } from 'app/cuentas/models';

@Component({
  selector: 'sx-cuentas-filter',
  template: `
  <form [formGroup]="form">
    <h2 mat-dialog-title>Filtro de cuentas</h2>
    <mat-dialog-content>
      <div layout>
        <mat-form-field flex>
          <input matInput formControlName="term" placeholder="Cuenta">
        </mat-form-field>
        <mat-checkbox formControlName="mayor"> De Mayor</mat-checkbox>
      </div>

      <div layout="column">
        <h3>Registros {{form.value.registros}}</h3>
        <mat-slider thumbLabel step="20" tickInterval="40" min="20" max="3000" formControlName="registros" flex>
        </mat-slider>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Canelar</button>
      <button mat-button [mat-dialog-close]="form.value" [disabled]="form.invalid">Filtrar</button>
    </mat-dialog-actions>
  </form>
  `
})
export class CuentasFilterComponent implements OnInit {
  form: FormGroup;
  filter: CatalogoFilter;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.filter = data.filter;
  }

  ngOnInit() {
    this.buildForm();
    if (this.filter) {
      this.form.patchValue(this.filter);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      term: [null],
      mayor: [true],
      registros: [50]
    });
  }
}
