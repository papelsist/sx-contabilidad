import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'sx-tipo-cambio-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ng-container [formGroup]="parent">
    <mat-form-field class="fill" >
      <input matInput placeholder="Tipo de cambio" type="number" [formControlName]="property" >
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
export class TipoCambioFieldComponent implements OnInit, OnDestroy {
  @Input() parent: FormGroup;
  @Input() property = 'tipoDeCambio';
  @Input() monedaField = 'moneda';
  subscription: Subscription;

  constructor() {}

  ngOnInit() {
    if (this.monedaField) {
      this.subscription = this.parent
        .get(`${this.monedaField}`)
        .valueChanges.pipe(startWith('MXN'))
        .subscribe(moneda => this.applyMoneda(moneda));
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private applyMoneda(moneda: string) {
    if (moneda !== 'MXN') {
      this.parent.get(`${this.property}`).enable();
    } else {
      this.parent.get(`${this.property}`).disable();
    }
  }
}
