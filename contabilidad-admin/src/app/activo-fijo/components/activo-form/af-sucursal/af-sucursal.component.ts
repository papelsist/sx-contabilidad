import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-af-sucursal',
  template: `
  <ng-container [formGroup]="parent" >
    <mat-form-field class="fill">
      <mat-select [placeholder]="placeholder" [formControlName]="propertyName" >
        <mat-option *ngFor="let sucursal of sucursales" [value]="sucursal">
          {{sucursal}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </ng-container>
  `,
  styles: [
    `
      .fill {
        width: 100%;
      }
    `
  ]
})
export class AfSucursalComponent implements OnInit {
  @Input()
  parent: FormGroup;

  @Input()
  propertyName = 'sucursal';

  @Input()
  placeholder = 'sucursal';

  sucursales = [
    'OFICINAS',
    'ANDRADE',
    'BOLIVAR',
    'CALLE 4',
    'TACUBA',
    'CF5FEBRERO',
    'VERTIZ 176',
    'SOLIS',
    'VENTAS'
  ];

  constructor() {}

  ngOnInit() {}
}
