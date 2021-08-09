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
import { CuentaSat } from 'app/cuentas/models';

export const CUENTA_SAT_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CuentaSatFieldComponent),
  multi: true
};

@Component({
  selector: 'sx-cuenta-sat-field',
  providers: [CUENTA_SAT_LOOKUPFIELD_VALUE_ACCESSOR],
  template: `
    <mat-form-field class="fill">
    <input type="text" matInput [formControl]="searchControl" placeholder="Cuenta SAT" [required]="required" [matAutocomplete]="auto">
    <mat-error>
      Debe selccionar una cuenta
    </mat-error>
  </mat-form-field>

  <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
    <mat-option *ngFor="let cuenta of cuentas$ | async" [value]="cuenta">
      {{ cuenta.codigo }} {{cuenta.nombre}}
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
export class CuentaSatFieldComponent implements OnInit, ControlValueAccessor {
  private apiUrl: string;

  searchControl = new FormControl();

  @Input()
  required = false;

  cuentas$: Observable<CuentaSat[]>;

  onChange;
  onTouch;
  subscription: Subscription;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('sat/cuentas');
  }

  ngOnInit() {
    this.cuentas$ = this.searchControl.valueChanges.pipe(
      switchMap(term => this.lookUp(term))
    );
    this.prepareControl();
  }

  private prepareControl() {
    this.subscription = this.searchControl.valueChanges
      .pipe(
        skip(1),
        tap(() => this.onTouch()),
        debounceTime(500),
        distinctUntilChanged(),
        filter(value => _.isObject(value)),
        distinctUntilChanged(
          (p: CuentaSat, q: CuentaSat) => p.codigo === q.codigo
        )
      )
      .subscribe(val => {
        this.onChange(val);
      });
  }

  lookUp(value: string): Observable<CuentaSat[]> {
    const params = new HttpParams().set('term', value);
    return this.http.get<CuentaSat[]>(this.apiUrl, {
      params: params
    });
  }

  displayFn(cuenta: CuentaSat) {
    if (!cuenta) {
      return '';
    }
    return `${cuenta.codigo} ${cuenta.nombre}`;
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
