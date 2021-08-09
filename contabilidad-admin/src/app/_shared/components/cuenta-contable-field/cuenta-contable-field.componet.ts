import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import * as _ from 'lodash';

import { Observable, Subscription } from 'rxjs';
import {
  skip,
  switchMap,
  tap,
  debounceTime,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { CuentaContable } from 'app/cuentas/models';

export const CUENTA_CONTABLE_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CuentaContableFieldComponent),
  multi: true
};

@Component({
  selector: 'sx-cuenta-contable-field',
  providers: [CUENTA_CONTABLE_LOOKUPFIELD_VALUE_ACCESSOR],
  template: `
    <mat-form-field class="fill">
    <input type="text" matInput [formControl]="searchControl" [placeholder]="placeholder"
      [required]="required" [matAutocomplete]="auto">
    <mat-error>
      Debe selccionar una cuenta
    </mat-error>
  </mat-form-field>

  <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
    <mat-option *ngFor="let cuenta of cuentas$ | async" [value]="cuenta">
      {{cuenta.clave}} {{cuenta.descripcion}}
      <span *ngIf="cuenta.padre">
        ({{cuenta.padre.descripcion.trim()}})
      </span>
      <span>
        [N: {{cuenta.nivel}}]
      </span>

    </mat-option>
  </mat-autocomplete>
  `,
  styles: [
    `
      .fill {
        width: 100%;
      }
    `
  ]
})
export class CuentaContableFieldComponent
  implements OnInit, ControlValueAccessor {
  private apiUrl: string;

  searchControl = new FormControl();

  @Input()
  required = true;

  @Input()
  detalle = true;

  @Input()
  placeholder = 'Cuenta';

  cuentas$: Observable<CuentaContable[]>;

  onChange;
  onTouch;
  subscription: Subscription;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('contabilidad/cuentas');
  }

  ngOnInit() {
    this.cuentas$ = this.searchControl.valueChanges.pipe(
      filter(term => !_.isObject(term)),
      switchMap(term => this.lookupCuentas(term))
    );
    this.prepareControl();
  }

  private prepareControl() {
    this.subscription = this.searchControl.valueChanges
      .pipe(
        skip(1),
        tap(() => this.onTouch()),
        debounceTime(500),
        // filter(value => _.isObject(value)),
        distinctUntilChanged((p: CuentaContable, q: CuentaContable) => {
          if (p && q) {
            return p.id === q.id;
          } else {
            return false;
          }
        })
      )
      .subscribe(val => {
        if (_.isObject(val)) {
          this.onChange(val);
        } else {
          this.onChange(null);
        }
        // this.onChange(val);
      });
  }

  lookupCuentas(value: string): Observable<CuentaContable[]> {
    const params = new HttpParams()
      .set('term', value)
      .set('detalle', this.detalle.toString());
    return this.http.get<CuentaContable[]>(this.apiUrl, {
      params: params
    });
  }

  displayFn(cuenta: CuentaContable) {
    if (!cuenta) {
      return '';
    }
    const p = cuenta.padre ? `(${cuenta.padre.descripcion.trim()})` : '';
    return `
      ${p} ${cuenta.descripcion} ${cuenta.clave} [N: ${cuenta.nivel}]`;
  }

  writeValue(obj: any): void {
    this.searchControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.searchControl.disable() : this.searchControl.enable();
  }
}
