import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-moneda-field',
  template: `
  <ng-container [formGroup]="parent">
    <mat-form-field class="fill" >
      <mat-select placeholder="Moneda" [formControlName]="property" class="fill">
        <mat-option *ngFor="let moneda of monedas"
            [value]="moneda.clave">{{ moneda.descripcion }}
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
export class MonedaFieldComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() property = 'moneda';

  monedas = [
    { clave: 'MXN', descripcion: 'PESOS (MXN)' },
    { clave: 'USD', descripcion: 'DOLARES (USD)' }
  ];

  constructor() {}

  ngOnInit() {}
}
