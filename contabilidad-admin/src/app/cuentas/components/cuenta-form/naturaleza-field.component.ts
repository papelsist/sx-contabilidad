import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-naturaleza-field',
  template: `
  <ng-container [formGroup]="parent">
    <mat-form-field>
      <mat-select placeholder="Naturaleza" [formControlName]="name" >
        <mat-option *ngFor="let tipo of tipos" [value]="tipo">
          {{tipo}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </ng-container>
  `
})
export class NaturalezaFieldComponent implements OnInit {
  apiUrl: string;

  @Input()
  parent: FormGroup;

  @Input()
  name = 'naturaleza';

  tipos = ['DEUDORA', 'ACREEDORA'];

  constructor() {}

  ngOnInit() {}
}
