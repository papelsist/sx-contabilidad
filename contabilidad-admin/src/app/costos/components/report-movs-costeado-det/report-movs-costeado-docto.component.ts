import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Periodo } from 'app/_core/models/periodo';

@Component({
  selector: 'sx-rep-movs-costeado-det',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="doAccept()">
      <h4 md-dialog-title>
        Movimientos costeados
      </h4>

      <div class="selector-form">
        <div layout>
          <mat-form-field flex  >
            <input matInput placeholder="Documento" formControlName="documento" autocomplete="off">
          </mat-form-field>
          <mat-form-field flex class="pad-left">
            <mat-select placeholder="Tipo" formControlName="tipo" >
              <mat-option *ngFor="let tipo of tipos"
                  [value]="tipo">{{ tipo }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div layout>
          <sx-sucursal-field [parent]="form" flex ></sx-sucursal-field>
          <mat-form-field flex class="pad-left">
            <input matInput [matDatepicker]="picker" placeholder="Fecha" formControlName="fecha" >
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
        </div>
      </div>

      <mat-dialog-actions>
        <button mat-button class="accent" type="submit" [disabled]="form.invalid">Aceptar</button>
        <button mat-button type="button" (click)="close()">Cancelar</button>
      </mat-dialog-actions>

    </form>
  `,
  styles: []
})
export class ReportMovsCosteadosDetComponent implements OnInit {
  form: FormGroup;
  periodo: Periodo;

  tipos = [
    'TODOS',
    'INI',
    'TPS',
    'TRS',
    'TPE',
    'REC',
    'COM',
    'MER',
    'CIS',
    'VIR',
    'RMD',
    'FAC',
    'CIM',
    'OIM',
    'DEC',
    'RMC'
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReportMovsCosteadosDetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const periodo = this.data.periodo || Periodo.mesActual();
    this.form = this.fb.group({
      fecha: [periodo.fechaInicial, Validators.required],
      sucursal: [null, Validators.required],
      tipo: [null, Validators.required],
      documento: [null, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fecha: Date = this.form.get('fecha').value;
    const res = {
      ...this.form.value,
      fecha: fecha.toISOString()
    };
    this.dialogRef.close(res);
  }
}
