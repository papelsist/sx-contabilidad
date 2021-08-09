import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sx-fecha-dialog',
  template: `
  <h2 mat-dialog-title>{{title}}</h2>
  <mat-dialog-content>
    <mat-form-field >
      <input matInput
        [matDatepicker]="myDatepicker"
        [min]="minDate"
        [max]="maxDate"
        placeholder="Fecha"
        [(ngModel)]="fecha">
      <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
      <mat-datepicker #myDatepicker></mat-datepicker>
      </mat-form-field>
    </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancelar</button>
    <button mat-button [mat-dialog-close]="fecha">Aceptar</button>
  </mat-dialog-actions>
`
})
export class FechaDialogComponent implements OnInit {
  fecha = new Date();

  title = '';
  minDate: Date;
  maxDate: Date;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title || '';
    this.minDate = data.minDate;
    this.maxDate = data.maxDate;
  }

  ngOnInit() {}
}
