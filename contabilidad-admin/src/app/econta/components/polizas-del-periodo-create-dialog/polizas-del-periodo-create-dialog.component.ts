import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EjercicioMes } from '../../../models/ejercicio-mes';

@Component({
  selector: 'sx-polizas-del-periodo-create-dialog',
  template: `
  <h2 mat-dialog-title>{{title}}</h2>
  <mat-dialog-content>
  <form [formGroup]="form">
    <div layout>
      <sx-ejercicio-field [parent]="form"></sx-ejercicio-field>
      <sx-mes-field [parent]="form" class="pad-left"></sx-mes-field>
    </div>
    <div layout>
      <mat-form-field  flex>
        <mat-select placeholder="Tipo" formControlName="tipoDeSolicitud" >
          <mat-option *ngFor="let tipo of tipos"
              [value]="tipo.clave">{{ tipo.descripcion }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div layout>
      <mat-form-field flex>
        <input matInput formControlName="numOrden" placeholder="Número de Orden" autocomplete="off"/>
      </mat-form-field>
      <mat-form-field flex class="pad-left">
        <input matInput formControlName="numTramite" placeholder="Número de Trámite" autocomplete="off"/>
      </mat-form-field>
    </div>
  </form>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Canelar</button>
    <button mat-button (click)="closeDialog()" [disabled]="form.invalid">Aceptar</button>
  </mat-dialog-actions>
`
})
export class PolizasPorPeriodoCreateDialogComponent implements OnInit {
  periodo: EjercicioMes;
  form: FormGroup;
  title;
  tipos = [
    { clave: 'ACTO_DE_FISCALIACIOM', descripcion: 'ACTO DE FISCALIZACION' },
    { clave: 'FISCALIZACION_COMPULSA', descripcion: 'FISCALIZACION_COMPULSA' },
    { clave: 'DEVOLUCION', descripcion: 'DEVOLUCION' },
    { clave: 'COMPENSACION', descripcion: 'COMPENSACION' }
  ];

  constructor(
    public dialogRef: MatDialogRef<PolizasPorPeriodoCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.periodo = data.periodo;
  }

  ngOnInit() {
    this.buildForm();
    this.form.patchValue(this.periodo);
  }

  buildForm() {
    this.form = this.fb.group({
      ejercicio: [this.periodo.ejercicio, Validators.required],
      mes: [this.periodo.mes, Validators.required],
      tipoDeSolicitud: [null, Validators.required],
      numOrden: [],
      numTramite: []
    });
  }

  closeDialog() {
    this.dialogRef.close(this.form.value);
  }

  getCommand() {
    return {
      ejercicio: this.form.get('ejercicio').value,
      mes: this.form.get('mes').value
    };
  }
}
