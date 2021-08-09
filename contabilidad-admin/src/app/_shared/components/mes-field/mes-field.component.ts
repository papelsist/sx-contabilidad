import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Mes } from 'app/_core/models/mes';

@Component({
  selector: 'sx-mes-field',
  template: `
  <ng-container [formGroup]="parent">
    <mat-form-field class="fill" >
      <mat-select placeholder="Mes" formControlName="mes" class="fill">
        <mat-option *ngFor="let mes of meses"
            [value]="mes.clave">{{ mes.descripcion }} ({{mes.clave}})
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
export class MesFieldComponent implements OnInit {
  @Input()
  parent: FormGroup;

  @Input()
  meses = Mes.MESES;

  constructor() {}

  ngOnInit() {}
}
