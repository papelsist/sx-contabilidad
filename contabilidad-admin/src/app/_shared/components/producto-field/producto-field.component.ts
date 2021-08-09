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

import { Producto } from 'app/models/producto';
import { ConfigService } from 'app/utils/config.service';

export const PRODUCTO_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProductoFieldComponent),
  multi: true
};

@Component({
  selector: 'sx-producto-field',
  providers: [PRODUCTO_LOOKUPFIELD_VALUE_ACCESSOR],
  template: `
    <mat-form-field class="fill">
    <input type="text" matInput [formControl]="searchControl" placeholder="Producto" [required]="required" [matAutocomplete]="auto">
    <mat-error>
      Debe selccionar un producto
    </mat-error>
  </mat-form-field>

  <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
    <mat-option *ngFor="let producto of productos$ | async" [value]="producto">
      {{ producto.clave }} {{producto.descripcion}} ({{producto.unidad}}) {{producto.activo ? '' : '* SUSPENDIDO *'}}
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
export class ProductoFieldComponent implements OnInit, ControlValueAccessor {
  private apiUrl: string;

  searchControl = new FormControl();

  @Input()
  required = false;
  @Input()
  activos = true;

  productos$: Observable<Producto[]>;

  onChange;
  onTouch;
  subscription: Subscription;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('productos');
  }

  ngOnInit() {
    this.productos$ = this.searchControl.valueChanges.pipe(
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
        distinctUntilChanged((p: Producto, q: Producto) => p.id === q.id)
      )
      .subscribe(val => {
        this.onChange(val);
      });
  }

  lookupProductoes(value: string): Observable<Producto[]> {
    console.log('Estse', this.activos);
    const params = new HttpParams()
      .set('term', value)
      .set('activos', this.activos ? 'true' : 'false');
    return this.http.get<Producto[]>(this.apiUrl, {
      params: params
    });
  }

  displayFn(producto: Producto) {
    if (!producto) {
      return '';
    }
    return `${producto.clave} ${producto.descripcion}
      (${producto.unidad}) ${producto.activo ? '' : 'SUSPENDIDO'}`;
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
