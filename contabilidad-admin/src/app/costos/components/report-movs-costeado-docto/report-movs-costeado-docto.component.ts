import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Periodo } from 'app/_core/models/periodo';

@Component({
  selector: 'sx-rep-movs-costeado-docto',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="doAccept()">
      <h4 md-dialog-title>
        Movimientos costeados
      </h4>

      <div class="selector-form">
        <div layout>
          <mat-form-field flex>
            <input matInput [matDatepicker]="picker" placeholder="Fecha ini" formControlName="fechaIni">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <mat-form-field flex class="pad-left">
            <input matInput [matDatepicker]="picker2" placeholder="Fecha fin" formControlName="fechaFin">
            <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
            <mat-datepicker #picker2></mat-datepicker>
          </mat-form-field>
        </div>

        <div layout>
          <mat-form-field flex >
            <mat-select placeholder="Tipo" formControlName="tipo" >
              <mat-option *ngFor="let tipo of tipos"
                  [value]="tipo">{{ tipo }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field flex  class="pad-left">
            <mat-select placeholder="Grupo" formControlName="grupo" >
              <mat-option *ngFor="let grupo of grupos"
                  [value]="grupo">{{ grupo }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <sx-sucursal-field [parent]="form"></sx-sucursal-field>
      </div>

      <mat-dialog-actions>
        <button mat-button class="accent" type="submit" [disabled]="form.invalid">Aceptar</button>
        <button mat-button type="button" (click)="close()">Cancelar</button>
      </mat-dialog-actions>

    </form>
  `,
  styles: []
})
export class ReportMovsCosteadosDoctoComponent implements OnInit {
  form: FormGroup;
  periodo: Periodo;
  grupos = [
    'COMPRAS',
    'VENTAS',
    'MOVIMIENTOS',
    'TRANSFORMACIONES',
    'TRASLADOS'
  ];
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
    public dialogRef: MatDialogRef<ReportMovsCosteadosDoctoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const periodo = this.data.periodo || Periodo.mesActual();
    this.form = this.fb.group({
      fechaIni: [periodo.fechaInicial, Validators.required],
      fechaFin: [new Date(), Validators.required],
      sucursal: [null, Validators.required],
      tipo: [null, Validators.required],
      grupo: [null, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fechaIni: Date = this.form.get('fechaIni').value;
    const fechaFin: Date = this.form.get('fechaFin').value;
    const res = {
      ...this.form.value,
      fechaIni: fechaIni.toISOString(),
      fechaFin: fechaFin.toISOString()
      // sucursal: sucursal.id
    };
    this.dialogRef.close(res);
  }
}
