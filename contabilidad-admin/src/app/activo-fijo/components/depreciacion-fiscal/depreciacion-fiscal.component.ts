import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as _ from 'lodash';

@Component({
  selector: 'sx-depreciacion-fiscal',
  template: `
  <form [formGroup]="form" novalidate (ngSumbit)="submit()">
    <h4 mat-dialog-title>
      Depreciación Fiscal
    </h4>
    <mat-dialog-content>
      <div layout="column">
        <sx-ejercicio-field [parent]="form"></sx-ejercicio-field>
        <mat-form-field>
          <input
            matInput
            formControlName="inpcPrimeraMitad"
            placeholder="INPC Primera mitad"
            autocomplete="off"
            type="number">
        </mat-form-field>

        <mat-form-field>
          <input
            matInput
            formControlName="inpcDelMesAdquisicion"
            placeholder="INPC Mes de adquisición"
            autocomplete="off"
            type="number">
        </mat-form-field>

        <mat-form-field>
          <input
            matInput
            formControlName="factorDeActualizacion"
            placeholder="Factur de Actualización"
            autocomplete="off"
            type="number">
        </mat-form-field>

        <mat-form-field>
          <input
            matInput
            formControlName="depreciacionAcumulada"
            placeholder="Depreciación acumulada"
            autocomplete="off"
            type="number">
        </mat-form-field>

        <mat-form-field>
          <input
            matInput
            formControlName="depreciacionFiscal"
            placeholder="Depreciación Fiscal"
            autocomplete="off"
            type="number">
        </mat-form-field>
      </div>

    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button type="button" (click)="dialogRef.close()">
        CANCELAR
      </button>
      <button mat-button (click)="submit()" [disabled]="form.invalid">
        <mat-icon>save</mat-icon> ACEPTAR
      </button>
    </mat-dialog-actions>
</form>

  `
})
export class DepreciacionFiscalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$ = new Subject<boolean>();
  acumulada: number;
  constructor(
    public dialogRef: MatDialogRef<DepreciacionFiscalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.acumulada = data.acumulada || 0;
  }

  ngOnInit() {
    this.buildForm();
    const o1 = this.form.get('inpcPrimeraMitad').valueChanges;
    const o2 = this.form.get('inpcDelMesAdquisicion').valueChanges;
    const res$ = merge(o1, o2).pipe(takeUntil(this.destroy$));
    res$.subscribe(() => {
      this.actualizarImportes();
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private buildForm() {
    this.form = this.fb.group({
      ejercicio: [2019, [Validators.required]],
      inpcPrimeraMitad: [0.0, [Validators.required]],
      inpcDelMesAdquisicion: [0.0, [Validators.required]],
      factorDeActualizacion: [
        { value: 0.0, disabled: true },
        [Validators.required]
      ],
      depreciacionAcumulada: [
        { value: this.acumulada, disabled: true },
        [Validators.required]
      ],
      depreciacionFiscal: [
        { value: 0.0, disabled: true },
        [Validators.required]
      ]
    });
  }

  submit() {
    if (this.form.valid) {
      const data = {
        ...this.form.getRawValue()
      };
      this.dialogRef.close(data);
    }
  }

  actualizarImportes() {
    const inpcP1 = this.form.get('inpcPrimeraMitad').value;
    const inpcMa = this.form.get('inpcDelMesAdquisicion').value;
    if (inpcMa) {
      const factor = _.round(inpcP1 / inpcMa, 4);
      this.form.get('factorDeActualizacion').setValue(factor);
      const df = this.acumulada * factor;
      this.form.get('depreciacionFiscal').setValue(_.round(df, 2));
    }
  }
}
