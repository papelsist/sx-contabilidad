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

export const CAJERA_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
// tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CajeraFieldComponent),
  multi: true
};

@Component({
  selector: 'sx-cajera-field',
  providers: [CAJERA_LOOKUPFIELD_VALUE_ACCESSOR],
  template: `
    <mat-form-field class="fill">
    <input type="text" matInput
      [formControl]="searchControl"
      placeholder="Cajera"
      [required]="required"
      [matAutocomplete]="auto">
    <mat-error>
      Debe selccionar un empleado (Cajera)
    </mat-error>
  </mat-form-field>

  <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
    <mat-option *ngFor="let empleado of empleados$ | async" [value]="empleado">
      {{ empleado.nombre }}  ({{empleado.numeroDeTrabajador}} {{empleado.puesto}} )
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
export class CajeraFieldComponent implements OnInit, ControlValueAccessor {
  private apiUrl: string;

  searchControl = new FormControl();

  @Input()
  required = false;

  @Input()
  activos = false;

  empleados$: Observable<any[]>;

  onChange;
  onTouch;
  subscription: Subscription;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('tesoreria/fichas/cajeras');
  }

  ngOnInit() {
    this.empleados$ = this.searchControl.valueChanges.pipe(
      switchMap(term => this.lookupProductoes(term))
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
          (p: any, q: any) => p.numeroDeTrabajador === q.numeroDeTrabajador
        )
      )
      .subscribe(val => {
        this.onChange(val);
      });
  }

  lookupProductoes(value: string): Observable<any[]> {
    const params = new HttpParams().set('term', value);
    return this.http.get<any[]>(this.apiUrl, {
      params: params
    });
  }

  displayFn(empleado: any) {
    if (!empleado) {
      return '';
    }
    return `
      ${empleado.nombre}
      (${empleado.numeroDeTrabajador}
      ${empleado.puesto}
      )`;
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
