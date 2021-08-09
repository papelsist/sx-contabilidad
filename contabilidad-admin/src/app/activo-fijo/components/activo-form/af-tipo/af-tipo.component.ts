import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-af-tipo',
  template: `
  <ng-container [formGroup]="parent" >
    <mat-form-field [style.width.px]="190">
      <mat-select placeholder="Tipo" [formControlName]="propertyName" >
        <mat-option *ngFor="let tipo of tipos" [value]="tipo">
          {{tipo}}
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
export class AfTipoComponent implements OnInit {
  @Input()
  parent: FormGroup;

  @Input()
  propertyName = 'tipo';

  tipos = ['VIGENTE', 'DEPRECIADO', 'VENDIDO'];

  constructor() {}

  ngOnInit() {}
}
