import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-subtipo-cuenta-field',
  template: `
  <ng-container [formGroup]="parent">
    <mat-form-field>
      <mat-select placeholder="Sub Tipo" [formControlName]="name" >
        <mat-option *ngFor="let tipo of tipos" [value]="tipo">
          {{tipo}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </ng-container>
  `
})
export class SubtipoCuentaFieldComponent implements OnInit {
  apiUrl: string;

  @Input()
  parent: FormGroup;

  @Input()
  name = 'subTipo';

  tipos = [
    'CIRCULANTE',
    'FIJO',
    'DIFERIDO',
    'CORTO_PLAZO',
    'LARGO_PLAZO',
    'CAPITAL',
    'ORDEN'
  ];

  constructor() {}

  ngOnInit() {}
}
