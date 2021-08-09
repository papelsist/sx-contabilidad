import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-tipo-cuenta-field',
  template: `
  <ng-container [formGroup]="parent">
    <mat-form-field>
      <mat-select placeholder="Tipo" [formControlName]="name" >
        <mat-option *ngFor="let tipo of tipos" [value]="tipo">
          {{tipo}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </ng-container>
  `
})
export class TipoCuentaFieldComponent implements OnInit {
  apiUrl: string;

  @Input()
  parent: FormGroup;

  @Input()
  name = 'tipo';

  tipos = ['ACTIVO', 'PASIVO', 'CAPITAL', 'ORDEN'];

  constructor() {}

  ngOnInit() {}
}
