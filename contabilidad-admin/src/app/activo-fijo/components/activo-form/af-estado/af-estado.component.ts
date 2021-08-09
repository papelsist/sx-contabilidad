import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-af-estado',
  template: `
  <ng-container [formGroup]="parent" >
    <mat-form-field [style.width.px]="190">
      <mat-select placeholder="Estado" [formControlName]="propertyName" >
        <mat-option *ngFor="let estado of estados" [value]="estado">
          {{estado}}
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
export class AfEstadoComponent implements OnInit {
  @Input()
  parent: FormGroup;

  @Input()
  propertyName = 'estado';

  estados = ['VIGENTE', 'DEPRECIADO', 'VENDIDO'];

  constructor() {}

  ngOnInit() {}
}
