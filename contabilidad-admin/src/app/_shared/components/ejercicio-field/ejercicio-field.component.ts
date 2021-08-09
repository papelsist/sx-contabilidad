import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "sx-ejercicio-field",
  template: `
  <ng-container [formGroup]="parent">
    <mat-form-field class="fill" >
      <mat-select placeholder="Ejercicio" formControlName="ejercicio" class="fill">
        <mat-option *ngFor="let year of years"
            [value]="year">{{ year }}
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
export class EjercicioFieldComponent implements OnInit {
  @Input()
  parent: FormGroup;

  years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

  constructor() {}

  ngOnInit() {}
}
