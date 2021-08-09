import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Periodo } from 'app/_core/models/periodo';

@Component({
  selector: 'sx-poliza-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <form [formGroup]="form">
    <span mat-dialog-title>Alta de póliza</span>
    <div mat-dialog-content>
      <div layout="column">
        <div layout>
          <mat-form-field flex>
            <input matInput placeholder="Ejercicio" formControlName="ejercicio" readonly="true">
          </mat-form-field>
          <mat-form-field flex class="pad-left">
            <input matInput placeholder="Mes" formControlName="mes" readonly="true">
          </mat-form-field>
        </div>
        <mat-form-field flex>
          <input matInput placeholder="Tipo" formControlName="tipo" readonly="true">
        </mat-form-field>
        <mat-form-field flex>
          <input matInput placeholder="Subtipo" formControlName="subtipo" readonly="true">
        </mat-form-field>
        <ng-container *ngIf= "conConcepto()">
          <sx-upper-case-field flex formControlName="concepto" placeholder="Concepto">
          </sx-upper-case-field>
        </ng-container>
        <mat-form-field >
          <input matInput [matDatepicker]="myDatepicker" placeholder="Fecha" [max]="maxDate" [min]="minDate" formControlName="fecha" >
          <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
          <mat-datepicker #myDatepicker></mat-datepicker>
        </mat-form-field>
      </div>
    </div>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="form.value" [disabled]="form.invalid">Aceptar</button>
      <button mat-button mat-dialog-close type="button">Cancelar</button>
    </mat-dialog-actions>
  </form>
  `
})
export class PolizaCreateComponent implements OnInit {
  form: FormGroup;
  config: {
    ejercicio: number;
    mes: number;
    tipo: string;
    subtipo: string;
    fecha: Date;
  };

  maxDate: Date;
  minDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.config = data.config;
    const periodo = Periodo.toPeriodo(this.config.ejercicio, this.config.mes);
    this.minDate = periodo.fechaInicial;
    this.maxDate = periodo.fechaFinal;
  }

  ngOnInit() {
    this.buildForm();
    this.form.patchValue(this.config);
  }

  buildForm() {
    this.form = this.fb.group({
      ejercicio: [null, [Validators.required]],
      mes: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      subtipo: [null, [Validators.required]],
      fecha: [null, [Validators.required]]
    });

    if (this.conConcepto()) {
      this.form.addControl(
        'concepto',
        new FormControl('', [Validators.required])
      );
    }
  }

  conConcepto(): boolean {
    return (
      this.config.subtipo === 'CIERRE_MENSUAL' ||
      this.config.subtipo === 'COMISIONES_BANCARIA_GASTO'
    );
  }
}
