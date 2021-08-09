import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Periodo } from 'app/_core/models/periodo';

@Component({
  selector: 'sx-report-coms-sin-analizar',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="doAccept()">
      <h4 md-dialog-title>
        Coms Sin analizar
      </h4>

      <div layout="column" class="selector-form">

        <mat-form-field flex>
          <input matInput [matDatepicker]="picker" placeholder="Fecha ini" formControlName="fechaIni">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <mat-form-field flex>
          <input matInput [matDatepicker]="picker2" placeholder="Fecha fin" formControlName="fechaFin">
          <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
          <mat-datepicker #picker2></mat-datepicker>
        </mat-form-field>
        <sx-sucursal-field [parent]="form"></sx-sucursal-field>
        <sx-proveedor-field formControlName="proveedor"></sx-proveedor-field>
        <sx-producto-field formControlName="producto"></sx-producto-field>
      </div>

      <mat-dialog-actions>
        <button mat-button class="accent" type="submit" [disabled]="form.invalid">Aceptar</button>
        <button mat-button type="button" (click)="close()">Cancelar</button>
      </mat-dialog-actions>

    </form>
  `,
  styles: []
})
export class ReportComsSinAnalizarComponent implements OnInit {
  form: FormGroup;
  periodo: Periodo;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReportComsSinAnalizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const periodo = this.data.periodo || Periodo.mesActual();
    this.form = this.fb.group({
      fechaIni: [periodo.fechaInicial, Validators.required],
      fechaFin: [new Date(), Validators.required],
      proveedor: [null],
      sucursal: [null],
      producto: []
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fechaIni: Date = this.form.get('fechaIni').value;
    const fechaFin: Date = this.form.get('fechaFin').value;
    const sucursal = this.form.get('sucursal').value;
    const proveedor = this.form.get('proveedor').value;
    const producto = this.form.get('producto').value;
    const res = {
      fechaIni: fechaIni.toISOString(),
      fechaFin: fechaFin.toISOString(),
      sucursal,
      producto: producto ? producto.id : null,
      proveedor: proveedor ? proveedor.id : null
    };
    this.dialogRef.close(res);
  }
}
